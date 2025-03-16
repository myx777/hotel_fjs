import { lazy, Suspense, useCallback } from 'react';
import type { CustomDatePickerProps } from './type/DateInputProps';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { ru } from 'date-fns/locale/ru';

/**
 * Функция для динамической загрузки компонента DatePicker с обработкой ошибок.
 * Если загрузка проходит успешно, возвращается загруженный компонент.
 * В случае ошибки возвращается fallback-компонент, отображающий сообщение об ошибке.
 *
 * @returns {Promise<{ default: React.ComponentType<any> }>} Промис с объектом, содержащим загруженный компонент.
 */
const loadDatePicker = (): Promise<{ default: React.ComponentType<any> }> => {
  return import('react-datepicker')
    .then((module) => ({
      default: module.default as React.ComponentType<any>,
    }))
    .catch(() => ({
      default: (() => (
        <div>Не удалось загрузить календарь</div>
      )) as React.ComponentType<any>,
    }));
};

// Используем lazy для динамической загрузки DatePicker
const DatePicker = lazy(loadDatePicker);

/**
 * Компонент CustomDatePicker - обёртка для выбора даты с динамической загрузкой компонента DatePicker.
 *
 * @component
 * @param {CustomDatePickerProps} props - Пропсы компонента.
 * @param {Date | null} props.selected - Выбранная дата.
 * @param {(date: Date | null) => void} props.onChange - Обработчик изменения даты.
 * @param {string} [props.placeholderText='Выберите дату'] - Текст-заполнитель для поля выбора даты.
 * @param {string} props.name - Имя поля, используется для идентификации.
 * @param {Date} props.minDate - Минимально допустимая дата.
 * @param {Date} [props.maxDate] - Максимально допустимая дата.
 * @param {boolean} [props.disabled] - Флаг, определяющий, отключен ли компонент.
 * @param {string} props.className - Дополнительные классы для стилизации.
 * @param {'bottom-start' | 'bottom-end'} [props.popperPlacement] - Расположение всплывающего окна календаря.
 * @returns {JSX.Element} Отображаемый компонент выбора даты.
 */
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
  placeholderText = 'Выберите дату',
  name,
  minDate,
  maxDate,
  disabled,
  className,
  popperPlacement,
}) => {
  // Мемоизированный обработчик изменений для оптимизации производительности.
  const handleChange = useCallback(
    (date: Date | null) => {
      onChange(date);
    },
    [onChange],
  );

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <DatePicker
        name={name}
        selected={selected}
        onChange={handleChange}
        placeholderText={placeholderText}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        className={`custom-date-input ${className}`}
        popperClassName="date-picker-popper"
        popperPlacement={popperPlacement}
        dateFormat="dd.MM.yyyy"
        locale={ru} // Передаем объект локали, а не строку
        ariaLabelledBy={`${name}-label`}
        showPopperArrow={false}
        preventOpenOnFocus
        autoComplete="off"
        isClearable
      />
    </Suspense>
  );
};

export default CustomDatePicker;
