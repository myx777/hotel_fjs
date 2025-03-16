/**
 * Компонент кнопки с единым синим оформлением и поддержкой состояния загрузки (loader).
 *
 * @param {Object} props - Свойства компонента.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Тип кнопки.
 * @param {() => void} [props.onClick] - Функция, вызываемая при клике на кнопку.
 * @param {React.ReactNode} props.children - Содержимое кнопки (текст или другие элементы).
 * @param {string} [props.className=''] - Дополнительные CSS-классы для кнопки.
 * @param {boolean} [props.disabled=false] - Является ли кнопка отключенной.
 * @param {boolean} [props.isLoading=false] - Состояние загрузки (если true, отображается спиннер).
 * @param {string} [props.loadingText] - Текст, отображаемый во время загрузки (опционально).
 * @returns {JSX.Element} Отрисованный элемент кнопки.
 */
import React from 'react';
import type { ButtonProps } from './type/Button';

export default function Button({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  isLoading = false,
  loadingText,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-blue-600 text-white py-2 px-4 rounded 
        flex items-center justify-center gap-2
        hover:bg-blue-700 transition-colors
        disabled:bg-gray-400 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          {/* Спиннер, анимируем с помощью Tailwind-класса animate-spin */}
          <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600"></div>
          {/* Отображаем либо специальный текст, либо основной children */}
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
