import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const userToCreate = {
        ...createUserDto,
        password: hashPassword
      };
      const newUser = await this.usersService.create(userToCreate);
      return response.status(HttpStatus.CREATED).json({
        message: 'user has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('login')
  async authenticate(@Res() response, @Body() loginUserdto: LoginUserDto) {

    try {
      const { email, password } = loginUserdto;
      const token = await this.usersService.authenticate(email, password);
      return response.status(HttpStatus.CREATED).json({
        message: 'user is successfully authenticated.',
        token,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not authenticated!',
        error: 'Bad Request',
      });
    }
  }
  

  @Get()
  async findAll(@Res() response) {
    try {
      const users = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
          message: 'All user data found successfully',
          users,
      });
    } catch (err) {
        return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'user fetched successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingStudent = await this.usersService.update(id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'user has been successfully updated',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'user deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
