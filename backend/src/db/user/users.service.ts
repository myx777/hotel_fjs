import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';

/**
 * Сервис для работы с пользователями
 * @method { create } - создание пользователя на основе приходящих данных в соответсвии с CreateUserDto
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserDto): Promise<UserDocument> {
    console.log(data);
    
    try {
      const createdUser = await this.userModel.create(data);
      return createdUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
