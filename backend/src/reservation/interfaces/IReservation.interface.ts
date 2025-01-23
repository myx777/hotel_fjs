import { CreateReservationDto } from '../dto/reservation.dto';
import { Reservation } from '../schemas/reservation.interface';
import { ReservationSearchOptions } from './ReservationSearchOptions.interfaces';

/**
 * Интерфейс для сервиса бронирования.
 *
 * @description Описание методов для добавления, удаления и получения бронирований.
 */
export interface IReservation {
  /**
   * Добавить новое бронирование.
   *
   * @param {CreateReservationDto} data - Данные для создания нового бронирования.
   * @returns {Promise<Reservation>} - Возвращает созданное бронирование.
   */
  addReservation(data: CreateReservationDto): Promise<Reservation>;

  /**
   * Удалить бронирование по идентификатору.
   *
   * @param {string} id - Идентификатор бронирования, которое нужно удалить.
   * @returns {Promise<void>} - Возвращает промис, который завершится после удаления бронирования.
   */
  removeReservation(id: string): Promise<void>;

  /**
   * Получить список бронирований с фильтрацией.
   *
   * @param {ReservationSearchOptions} filter - Параметры фильтрации для поиска бронирований.
   * @returns {Promise<Array<Reservation>>} - Возвращает список бронирований, соответствующих критериям.
   */
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
