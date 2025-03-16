import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Guard для проверки ролей пользователя.
 *
 * Этот Guard используется совместно с декоратором `@Roles()`, чтобы ограничивать
 * доступ к маршрутам в зависимости от роли пользователя.
 *
 * @example
 * ```typescript
 * @UseGuards(AuthGuard, RolesGuard)
 * @Roles('admin')
 * @Get('users')
 * getAllUsers() {
 *   return "Доступ разрешен только админам";
 * }
 * ```
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @param {Reflector} reflector - Инструмент для работы с метаданными в NestJS.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Проверяет, может ли текущий пользователь получить доступ к запрашиваемому ресурсу.
   *
   * @param {ExecutionContext} context - Контекст выполнения запроса.
   * @returns {boolean} - Возвращает `true`, если пользователь имеет нужную роль, иначе выбрасывает ошибку.
   * @throws {ForbiddenException} - Если пользователь не аутентифицирован или не имеет доступа.
   */
  canActivate(context: ExecutionContext): boolean {
    // Получаем список требуемых ролей из декоратора @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Если роли не указаны, доступ открыт для всех
    if (!requiredRoles) {
      return true;
    }

    // Получаем объект запроса
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.session.user; // Данные пользователя хранятся в сессии

    // Если пользователь не аутентифицирован, выбрасываем ошибку
    if (!user) {
      throw new ForbiddenException('Необходима аутентификация');
    }

    // Если роль пользователя не входит в список разрешенных, выбрасываем ошибку
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Недостаточно прав');
    }

    return true;
  }
}
