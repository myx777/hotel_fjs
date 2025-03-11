import { SetMetadata } from "@nestjs/common";
import { Role } from "../roles";

/**
 * Ключ метаданных для хранения ролей.
 */
export const ROLES_KEY = 'roles';

/**
 * Декоратор для назначения ролей на обработчики маршрутов.
 * Используется для ограничения доступа к определенным эндпоинтам по ролям.
 *
 * @param {...Role[]} roles - Список ролей, которым разрешен доступ к эндпоинту.
 * @returns {MethodDecorator & ClassDecorator} - Декоратор, который добавляет метаданные с ролями.
 *
 * @example
 * ```typescript
 * @Roles(Role.Admin)
 * @Get('admin')
 * getAdminData() {
 *   return "Admin data";
 * }
 * ```
 */
export const Roles = (...roles: Role[]): MethodDecorator & ClassDecorator => 
  SetMetadata(ROLES_KEY, roles);
