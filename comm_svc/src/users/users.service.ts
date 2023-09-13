import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt'
import { WebsocketGateway } from './websocket/websocket.gateway';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
    private readonly webSocketGateway: WebsocketGateway
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // let hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // let userToCreate: any = {
    //   ...createUserDto,
    //   password: hashedPassword
    // };

    // console.log(hashedPassword)

    let createdUser = await this.userModel.create(createUserDto)
    if (createdUser) {
      this.webSocketGateway.handleServiceHit('createUser')
    }
    return createdUser
  }

  async findAll() {
    let results = await this.userModel.find().exec()
    if (results) {
      this.webSocketGateway.handleServiceHit('findAll')
    }
    return results
  }

  async findOne(id: string): Promise<User | null> {
    const userId = new Types.ObjectId(id)
    const existingUser = await this.userModel.findOne(userId).exec()
    if (!existingUser) {
      throw new NotFoundException(`Student #${id} not found`);
    }

    if (existingUser) {
      console.log('socket hit')
      this.webSocketGateway.handleServiceHit('findOne')
    }
    
    return existingUser
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec()
    if (updatedUser) {
      this.webSocketGateway.handleServiceHit('updateUser')
    }
    return updatedUser 
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id)
    this.webSocketGateway.handleServiceHit('deleteUser')
    return "user has been deleted"
  }
}
