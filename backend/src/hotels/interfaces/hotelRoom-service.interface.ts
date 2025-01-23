import { SearchParam } from 'src/interfaces/searchParam.interface';
import { HotelRoom } from '../schema/HotelRoom.schema';

/**
 * Параметры для поиска номеров отеля.
 *
 * @description Используются для фильтрации списка номеров при вызове метода `search`.
 * Наследуется от общего интерфейса пагинации `SearchParam`.
 *
 * @property {string | null} hotel - Идентификатор отеля, к которому принадлежат номера.
 * @property {boolean} [isEnabled] - Флаг для фильтрации по активности номера (включен/выключен).
 */
interface SearchRoomsParams extends SearchParam {
  hotel: string | null;
  isEnabled?: boolean;
}

/**
 * Интерфейс сервиса для работы с номерами отелей.
 *
 * @description Определяет контракт для реализации сервиса, который работает с сущностями номеров отелей.
 *
 * @method {create} create - Создание нового номера отеля на основе переданных данных.
 * @method {findById} findById - Поиск номера по идентификатору. Возвращает объект номера или `null`, если не найден.
 * @method {search} search - Поиск номеров по заданным параметрам. Возвращает массив объектов номеров.
 * @method {update} update - Обновление данных номера по идентификатору.
 */
interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: string | null): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
