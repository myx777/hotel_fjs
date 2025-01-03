import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.BACKEND_PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'fatal'],
  });
  await app.listen(PORT);
}

bootstrap();
