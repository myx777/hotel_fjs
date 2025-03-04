import { useState } from 'react';
import { LogIn } from './LogIn/LogIn';

export function Auth() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center rounded m-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-500 cursor-pointer"
      >
        <span>Войти</span>
        {/* SVG-стрелка, меняющая направление при isOpen = true */}
        <svg
          xmlns="../../../../public/Arrow - Right.svg"
          className={`h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen ? <LogIn /> : null}
      {/* Контейнер для картинки с фиксированной шириной и высотой */}
      <div className="rounded-xl bg-gray-200 w-12 h-12 flex items-center justify-center">
        <img
          src="../../../../public/cat-svgrepo-com.svg"
          alt="cat"
          className="w-8 h-8 object-cover"
        />
      </div>
    </div>
  );
}
