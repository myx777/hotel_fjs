import { SearchParam } from 'src/interfaces/searchParam.interface';
import { User } from '../schema/user.schema';


/**
 * Параметры для поиска пользователей.
 *
 * @description Используются для фильтрации списка пользователей при вызове метода `findAll`.
 * @property {string} [email] - Частичное совпадение email пользователя (опционально).
 * @property {string} [name] - Частичное совпадение имени пользователя (опционально).
 * @property {string} [contactPhone] - Частичное совпадение контактного телефона пользователя (опционально).
 */
export interface SearchUserParams extends SearchParam {
  email?: string;
  name?: string;
  contactPhone?: string;
}

/**
 * Интерфейс сервиса для работы с пользователями.
 * @description определяет контракт для реализации сервиса, который работает с сущностями пользователя
 * @method {create} create - создание пользователя на основе переданных данных (data)
 * @method {findById} findById - поиск пользователя по id либо null если не находит
 * @method {findByEmail} findByEmail - поиск пользователя по email либо null если не находит
 * @method {findAll} findAll - поиск всех пользователей
 */

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: string | null): Promise<User>;
  findByEmail(email: string | null): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}
