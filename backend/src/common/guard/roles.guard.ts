import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Guard для проверки доступа на основе ролей пользователя.
 * Используется в сочетании с декоратором `@Roles()` для ограничения доступа к определенным эндпоинтам.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @param {Reflector} reflector - Инструмент для работы с метаданными в NestJS.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Определяет, может ли текущий пользователь получить доступ к маршруту.
   *
   * @param {ExecutionContext} context - Контекст выполнения запроса.
   * @returns {boolean} - Возвращает `true`, если у пользователя есть необходимая роль, иначе `false`.
   *
   * @example
   * ```typescript
   * @UseGuards(RolesGuard)
   * @Roles(Role.Admin)
   * @Get('admin')
   * getAdminData() {
   *   return "Admin data";
   * }
   * ```
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Если роли не указаны, доступ разрешен
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
