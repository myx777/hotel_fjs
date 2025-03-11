import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

/**
 * Сервис аутентификации
 */
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  /**
   * Проверяет email + пароль
   */
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      return { id: user._id, email: user.email, role: user.role };
    }
    return null;
  }
}
