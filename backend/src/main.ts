import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { SessionModule } from './common/session/session.module';


const PORT = process.env.BACKEND_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'fatal'],
  });

  // Глобальная валидация данных
  app.useGlobalPipes(new ValidationPipe());

  // Подключаем сессии
  app.use(SessionModule.configureSession());

  // Подключаем Passport.js для работы с сессиями
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}

bootstrap();
