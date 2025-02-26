import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';

//! надо с использованием passport.js

/**
 * Сервис аутентификаци
 * @method signIn - метод для аутентификации пользователя
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param email - email пользователя
   * @param password - пароль пользователя
   * @returns JWT токен
   */
  async signIn(
    // !ToDo  подумай и добавь шифрование трафика с клиента на сервер и обратно

    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new HttpException(
          'Пользователь не найден',
          HttpStatus.BAD_REQUEST,
        );
      }

      return;
    } catch (error) {
      throw console.log(`Ошибка формирования JWT ${error.message}`);
    }
  }
}
