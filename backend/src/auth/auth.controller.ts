import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

/**
 * Контроллер аутентификации
 */
@Controller('auth')
export class AuthController {
  /**
   * Авторизация пользователя через Passport.js
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: ExpressRequest) {
    req.session.user = req.user as { id: string; email: string; role: string };
    return { message: 'Успешный вход', user: req.session.user };
  }

  /**
   * Выход из системы (очистка сессии)
   */
  @Post('logout')
  logout(@Request() req: ExpressRequest) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Ошибка при уничтожении сессии:', err);
      }
    });
    return { message: 'Вы вышли из системы' };
  }
}
