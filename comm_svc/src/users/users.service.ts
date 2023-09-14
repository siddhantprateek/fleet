import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { Model, Types } from 'mongoose';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { WebsocketGateway } from './websocket/websocket.gateway';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
    private readonly webSocketGateway: WebsocketGateway,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let createdUser = await this.userModel.create(createUserDto)
    if (createdUser) {
      this.webSocketGateway.handleServiceHit('createUser')
    }
    return createdUser
  }

  async authenticate(email: string, password: string): Promise<string | "unauthorized access"> {
    let existingUser = await this.userModel.findOne({ email })
    if (!existingUser) {
      throw new NotFoundException(`User #${email} not found`);
    }
    if (existingUser) {
      console.log('socket hit')
      this.webSocketGateway.handleServiceHit('authenticate')
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return "unauthorized access"
    }
    const payload = { sub: existingUser._id, username: existingUser.email };
    let access_token = await this.jwtService.signAsync(payload)
    return access_token
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
      throw new NotFoundException(`User #${id} not found`);
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
