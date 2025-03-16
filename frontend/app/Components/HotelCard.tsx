import { title } from 'process';
import React from 'react';
import type { HotelCardProps } from './type/Hotel';
import Button from './Button';

/**
 * Компонент карточки отеля.
 *
 * @param {HotelCardProps} props - Свойства компонента.
 * @returns {JSX.Element} Отрендеренная карточка отеля.
 */
export default function HotelCard({ title, description }: HotelCardProps) {
  return (
    <div className="flex gap-4 border-b p-4">
      {/* Заглушка для изображения */}
      <div className="w-24 h-24 bg-gray-300 flex items-center justify-center">
        Image
      </div>

      <div className="flex flex-col flex-1">
        <h2 className="font-medium text-lg">{title}</h2>
        <p className="text-gray-700 mt-1">{description}</p>
        <Button> Подробнее </Button>
      </div>
    </div>
  );
}
