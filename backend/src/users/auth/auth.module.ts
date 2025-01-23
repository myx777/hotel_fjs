import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users.module';

@Module({
  imports: [],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
