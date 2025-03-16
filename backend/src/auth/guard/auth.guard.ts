import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

/**
 * Guard для проверки, аутентифицирован ли пользователь (на основе сессий)
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.session.user) {
      throw new UnauthorizedException('Необходима авторизация');
    }

    return true;
  }
}
