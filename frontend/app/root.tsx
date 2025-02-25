import {
  isRouteErrorResponse, // Проверяет, является ли ошибка HTTP-ответом (например, 404)
  Links, // Вставляет <link> теги в <head>
  Meta, // Вставляет <meta> теги в <head>
  Outlet, // Рендерит вложенные маршруты
  Scripts, // Вставляет <script> теги
  ScrollRestoration, // Восстанавливает положение прокрутки после навигации
} from 'react-router';

import type { Route } from './+types/root'; // Импортируем типы маршрутов
import './app.css'; // Подключаем стили

// подключение шрифтов
export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

// общий макет
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta /> {/* Вставляет мета-теги */}
        <Links /> {/* Вставляет <link> теги */}
      </head>
      <body>
        {children} {/* Здесь будут рендериться маршруты */}
        <ScrollRestoration /> {/* Восстанавливает прокрутку при переходах */}
        <Scripts /> {/* Вставляет <script> теги */}
      </body>
    </html>
  );
}
// рендеринг маршрутов
export default function App() {
  return <Outlet />;
}

// обработка всех ошибки: 404 и др
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Ошибка';
  let details = 'Произошла непредвиденная ошибка.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404
        ? '404 - Страница не найдена'
        : `Ошибка ${error.status}`;
    details =
      error.status === 404
        ? 'К сожалению, мы не смогли найти нужную страницу.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">{message}</h1>
      <p className="text-lg text-gray-700 mt-2">{details}</p>

      {stack && (
        <pre className="w-full max-w-lg p-4 bg-gray-200 border rounded-lg text-left overflow-auto mt-4 text-sm">
          <code>{stack}</code>
        </pre>
      )}
      <a
        href="/"
        className="mt-6 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-300"
      >
        Вернуться на главную
      </a>
    </div>
  );
}
