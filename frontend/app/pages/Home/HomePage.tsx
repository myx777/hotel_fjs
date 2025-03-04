import { useState, lazy, Suspense } from 'react';
import { setDefaultLocale } from 'react-datepicker'; // Импорт setDefaultLocale
import { Form, useActionData } from 'react-router';
import 'react-datepicker/dist/react-datepicker.min.css';

// Импорт локали
import { ru } from 'date-fns/locale';
import Button from '~/Components/Button';
import DateInput from '~/Components/DateInput';

// Устанавливаем русскую локаль как локаль по умолчанию
setDefaultLocale('ru');

// Динамическая загрузка компонента DatePicker
const DatePicker = lazy(() => import('react-datepicker'));

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const query = formData.get('query')?.toString() ?? '';

  const results = await fetch(
    `https://api.example.com/hotels?search=${query}`,
  ).then((r) => r.json());

  return results;
}

export default function HomePage() {
  // Отдельные стейты для даты заезда/выезда
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const results = useActionData() as any;

  return (
    <div className="max-w-[705px] h-auto grow bg-white rounded text-[#232D42] font-inter tracking-[0px] p-4">
      <h1 className="font-medium text-[2.5rem] leading-[3.03rem] tracking-[0rem]">
        Поиск гостиницы
      </h1>
      <Form method="post" className="flex flex-col gap-4 mt-5">
        {/* Текстовое поле с label */}
        <label htmlFor="queryInput" className="block font-medium">
          <input
            id="queryInput"
            type="text"
            name="query"
            placeholder="Введите название гостиницы (необязательно)"
            className="mt-1 block w-full border rounded p-2"
          />
        </label>

        <div className="flex justify-between">
          {/* Поле для даты заезда */}
          <Suspense fallback={<div>Loading...</div>}>
            <DatePicker
              name="checkIn"
              selected={checkIn}
              onChange={(date: Date) => setCheckIn(date)}
              placeholderText="Заезд"
            />
          </Suspense>

          <div>-</div>

          {/* Поле для даты выезда */}
          <Suspense fallback={<div>Loading...</div>}>
            <DatePicker
              name="checkOut"
              selected={checkOut}
              onChange={(date: Date) => setCheckOut(date)}
              placeholderText="Выезд"
            />
          </Suspense>
        </div>

        <Button
          onClick={() => console.log('Нажата кнопка искать')}
          type="submit"
          className="self-start"
        >
          Искать
        </Button>
      </Form>

      {results && (
        <ul className="mt-4">
          {results.map((hotel: any) => (
            <li key={hotel.id} className="py-1 border-b">
              {hotel.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
