import { useState, useCallback } from 'react';

/**
 * Хук для управления состоянием поиска гостиниц.
 *
 * @returns {object} Объект с состояниями: checkIn, checkOut, hotelName и функциями-обработчиками.
 */
export function useHotelSearch() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [hotelName, setHotelName] = useState<string>('');

  /**
   * Обработчик изменения даты заезда.
   * Если новая дата заезда больше текущей даты выезда, дата выезда сбрасывается.
   *
   * @param {Date | null} date - Новая выбранная дата заезда.
   */
  const handleCheckInChange = useCallback(
    (date: Date | null) => {
      setCheckIn(date);
      if (date && checkOut && date > checkOut) {
        setCheckOut(null);
      }
    },
    [checkOut]
  );

  /**
   * Обработчик изменения даты выезда.
   * Если выбранная дата выезда меньше даты заезда, обновление не производится.
   *
   * @param {Date | null} date - Новая выбранная дата выезда.
   */
  const handleCheckOutChange = useCallback(
    (date: Date | null) => {
      if (checkIn && date && date < checkIn) return;
      setCheckOut(date);
    },
    [checkIn]
  );

  return { checkIn, checkOut, hotelName, setHotelName, handleCheckInChange, handleCheckOutChange };
}
