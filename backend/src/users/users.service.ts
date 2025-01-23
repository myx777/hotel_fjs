import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { passwordHashed } from './middleware/password';

/**
 * Сервис для работы с пользователями
 * @method { create } - создание пользователя на основе приходящих данных в соответсвии с CreateUserDto и хеширование пароля
 * 
 * @method { findByEmail } - поиск пользователя по email
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserDto): Promise<UserDocument> {
    try {
      const { password, ...datadb } = data;
      const passwordHash = await passwordHashed(password);
      const createdUser = await this.userModel.create({
        ...datadb,
        passwordHash,
      });
      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          'Пользователь с таким email уже существует',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Ошибка создания пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**
   * 
   * @param email - email пользователя
   * @returns - пользователь либо null
   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    return user;
  }
}
