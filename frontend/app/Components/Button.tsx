/**
 * Компонент кнопки с единым синим оформлением.
 *
 * @param {Object} props - Свойства компонента.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Тип кнопки.
 * @param {() => void} [props.onClick] - Функция, вызываемая при клике на кнопку.
 * @param {React.ReactNode} props.children - Содержимое кнопки.
 * @param {string} [props.className=''] - Дополнительные CSS-классы для кнопки.
 * @returns {JSX.Element} Отрисованный элемент кнопки.
 */
import type { ButtonProps } from './type/Button';

export default function Button({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white py-2 px-4 rounded cursor-pointer ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
