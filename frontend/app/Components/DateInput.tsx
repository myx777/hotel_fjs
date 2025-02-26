import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ru } from 'date-fns/locale/ru';

registerLocale('ru', ru);

/**
 * Форматирует дату в строку в формате ISO (YYYY-MM-DD).
 *
 * @param {Date | null} date - Дата для форматирования.
 * @returns {string} Строка с датой в формате "YYYY-MM-DD" или пустая строка, если дата равна null.
 */
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
};

/**
 * Компонент DateInput для выбора даты с использованием react-datepicker.
 *
 * Компонент отображает DatePicker с заданными параметрами, а также генерирует скрытое поле,
 * в котором сохраняется выбранная дата в формате ISO. Это позволяет передавать значение даты
 * при отправке формы.
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.name - Имя для скрытого input, в который будет передана выбранная дата.
 * @param {Date | null} props.selected - Выбранная дата. Если значение равно null, дата не выбрана.
 * @param {(date: Date | null) => void} props.onChange - Функция, вызываемая при выборе даты.
 * @param {string} [props.placeholder=''] - Текст-подсказка, отображаемый в поле DatePicker до выбора даты.
 * @param {string} [props.className=''] - Дополнительные CSS-классы, которые будут добавлены к корневому элементу.
 * @returns {JSX.Element} Отрисованный компонент DateInput.
 */
export default function DateInput({
  name,
  selected,
  onChange,
  placeholder = '',
  className = '',
}: DateInputProps) {
  return (
    <>
      <DatePicker
        selected={selected}
        onChange={onChange}
        locale="ru"
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholder}
        className={`w-80 border rounded p-2 ${className}`}
      />
      {/* Скрытое поле для передачи выбранной даты в форму */}
      <input type="hidden" name={name} value={formatDate(selected)} />
    </>
  );
}
