import { Module } from '@nestjs/common';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([]), // Можно добавить коллекции, если нужно
  ],
  providers: [],
  exports: [],
})
export class SessionModule {
  static configureSession() {
    return session({
      secret: process.env.SESSION_SECRET || 'default-secret-key', // Ключ подписи куки
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/mydb',
        collectionName: 'sessions',
        ttl: 3600, // ⏳ Время жизни сессии (1 час)
      }),
      cookie: {
        maxAge: 3600000, // 1 час
        httpOnly: true, // Защита от XSS (куки нельзя прочитать JS-скриптом)
        secure: false, // `true` для HTTPS
        sameSite: 'lax', // Защита от CSRF
      },
    });
  }
}
