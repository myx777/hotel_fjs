import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.BACKEND_PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'fatal'],
  });
  // валидация всех данных
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(PORT);
}

bootstrap();
