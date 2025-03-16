import { useState, useCallback, type FormEvent, type JSX } from 'react';
import { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import Button from '~/Components/Button';
import CustomDatePicker from '~/Components/CustomDatePicker';
import { useHotelApi } from '~/hooks/useHotelApi';

/**
 * Компонент главной страницы для поиска гостиниц.
 *
 * Позволяет пользователю выбрать даты заезда и выезда, а также (опционально)
 * ввести название гостиницы. При отправке формы вызывается функция поиска
 * из кастомного хука useHotelApi.
 *
 * @returns {JSX.Element} JSX-элемент главной страницы.
 */
export default function HomePage(): JSX.Element {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [hotelName, setHotelName] = useState<string>('');
  const { data, loading, error, searchHotels } = useHotelApi();

  /**
   * Обработчик изменения даты заезда.
   *
   * Обновляет состояние checkIn и сбрасывает checkOut, если новая дата заезда позже текущей даты выезда.
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
   *
   * Обновляет состояние checkOut, если выбранная дата не раньше даты заезда.
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

  /**
   * Обработчик отправки формы.
   *
   * Преобразует выбранные даты в формат ISO и вызывает функцию поиска гостиниц из useHotelApi.
   *
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!checkIn || !checkOut) return;
      try {
        await searchHotels({
          query: hotelName,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
        });
      } catch (err) {
        console.error(err);
      }
    },
    [checkIn, checkOut, hotelName, searchHotels]
  );

  return (
    <div className="max-w-[705px] h-auto grow bg-white rounded text-[#232D42] font-inter tracking-[0px] p-4">
      <h1 className="font-medium text-[2.5rem] leading-[3.03rem] tracking-[0rem]">Поиск гостиницы</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
        <label htmlFor="queryInput" className="block font-medium">
          <input
            id="queryInput"
            type="text"
            name="query"
            placeholder="Введите название гостиницы (необязательно)"
            className="mt-1 block w-full border rounded p-2 focus:ring-2 focus:ring-blue-300"
            autoComplete="off"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </label>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <CustomDatePicker
              name="checkIn"
              selected={checkIn}
              onChange={handleCheckInChange}
              placeholderText="Заезд"
              minDate={new Date()}
              maxDate={checkOut || undefined}
              className="w-full border rounded p-2"
              popperPlacement="bottom-start"
            />
          </div>
          <span className="mx-8">—</span>
          <div className="flex-1">
            <CustomDatePicker
              name="checkOut"
              selected={checkOut}
              onChange={handleCheckOutChange}
              placeholderText="Выезд"
              minDate={checkIn || new Date()}
              className="w-full border rounded p-2"
              popperPlacement="bottom-end"
              disabled={!checkIn}
            />
          </div>
        </div>
        <Button type="submit" className="self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md" disabled={!checkIn || !checkOut}>
          {loading ? 'Загрузка...' : 'Искать'}
        </Button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {data && (
        <div className="mt-4 space-y-2">
          <h2 className="text-xl font-semibold">Результаты поиска:</h2>
          <ul className="divide-y divide-gray-200">
            {data.map((hotel: any) => (
              <li key={hotel.id} className="py-3 px-2 hover:bg-gray-50 transition-colors">
                <div className="font-medium">{hotel.name}</div>
                <div className="text-sm text-gray-600">{hotel.address}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
