import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schema/user.schema';

/**
 * Контролер юзеров
 *
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/registration')
  create(@Body() body: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(body);
  }
}
