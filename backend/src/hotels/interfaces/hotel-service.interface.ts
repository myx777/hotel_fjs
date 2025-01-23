import { SearchParam } from 'src/interfaces/searchParam.interface';
import { Hotel } from '../schema/hotel.schema';

/**
 * Параметры для поиска отелей.
 *
 * @description Используются для фильтрации списка отелей при вызове метода `search`.
 * Наследуется от общего интерфейса пагинации `SearchParam`.
 *
 * @property {string} title - Название отеля для поиска (полное или частичное совпадение).
 */
interface SearchHotelParams extends SearchParam {
  title: string;
}

/**
 * Параметры для обновления данных отеля.
 *
 * @description Содержит данные, которые можно обновить в записи отеля.
 *
 * @property {string} title - Новое название отеля.
 * @property {string} description - Новое описание отеля.
 */
interface UpdateHotelParams {
  title: string;
  description: string;
}

/**
 * Интерфейс сервиса для работы с отелями.
 *
 * @description Определяет контракт для реализации сервиса, который работает с сущностями отелей.
 *
 * @method {create} create - Создание нового отеля на основе переданных данных.
 * @method {findById} findById - Поиск отеля по идентификатору. Возвращает объект отеля или `null`, если не найден.
 * @method {search} search - Поиск отелей по заданным параметрам. Возвращает массив объектов отелей.
 * @method {update} update - Обновление данных отеля по идентификатору.
 */
interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: string | null): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: string, data: UpdateHotelParams): Promise<Hotel>;
}
