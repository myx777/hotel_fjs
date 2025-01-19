import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
