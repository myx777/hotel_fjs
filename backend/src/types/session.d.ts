import 'express-session';

/**
 * Расширяет стандартный интерфейс Session, добавляя поле `user`
 */
declare module 'express-session' {
  interface SessionData {
    user?: { id: string; email: string; role: string };
  }
}