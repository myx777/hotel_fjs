import { useState, useCallback } from 'react';

/**
 * Кастомный хук для работы с API гостиниц и авторизации.
 *
 * Предоставляет методы для поиска гостиниц, обновления, авторизации (login) и выхода (logout).
 * Функции авторизации и выхода настроены для работы с сессионными cookie.
 *
 * @returns {object} Объект с состояниями и функциями API:
 *  - data: результаты последнего запроса.
 *  - loading: флаг загрузки.
 *  - error: сообщение об ошибке (если есть).
 *  - searchHotels: функция для поиска гостиниц.
 *  - updateHotel: функция для обновления данных гостиницы (заготовка).
 *  - login: функция для авторизации, которая ожидает сессионное cookie.
 *  - logout: функция для выхода из приложения.
 */
export function useHotelApi() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Функция для поиска гостиниц.
   *
   * @param {object} params - Параметры поиска.
   * @param {string} [params.query] - Название гостиницы (опционально).
   * @param {string} params.checkIn - Дата заезда в формате ISO.
   * @param {string} params.checkOut - Дата выезда в формате ISO.
   * @returns {Promise<any>} Промис с результатами поиска.
   * @throws {Error} Если запрос завершился с ошибкой.
   */
  const searchHotels = useCallback(
    async (params: { query?: string; checkIn: string; checkOut: string }) => {
      setLoading(true);
      setError(null);
      try {
        const searchParams = new URLSearchParams();
        if (params.query) {
          searchParams.set('query', params.query);
        }
        searchParams.set('checkIn', params.checkIn);
        searchParams.set('checkOut', params.checkOut);

        const response = await fetch(`https://api.example.com/hotels?${searchParams.toString()}`, {
          method: 'GET',
          // Чтобы отправлять и получать cookie, необходимо указать credentials
          credentials: 'include',
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Ошибка поиска');
        }
        const result = await response.json();
        setData(result);
        return result;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Функция для обновления данных гостиницы.
   * (Реализация зависит от API)
   *
   * @param {object} hotelData - Данные гостиницы для обновления.
   * @returns {Promise<any>} Промис с результатами обновления.
   */
  const updateHotel = useCallback(async (hotelData: any) => {
    // Пример запроса для обновления гостиницы:
    // const response = await fetch('https://api.example.com/hotels/update', {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify(hotelData),
    // });
    // return await response.json();
  }, []);

  /**
   * Функция для авторизации пользователя.
   *
   * Отправляет учетные данные на сервер и ожидает, что сервер установит сессионное cookie.
   *
   * @param {object} credentials - Учетные данные пользователя.
   * @param {string} credentials.username - Имя пользователя.
   * @param {string} credentials.password - Пароль.
   * @returns {Promise<any>} Промис с результатом авторизации.
   * @throws {Error} Если авторизация не удалась.
   */
  const login = useCallback(async (credentials: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.example.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Включаем cookie в запросах
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Ошибка авторизации');
      }
      const result = await response.json();
      // Сессионное cookie обычно устанавливается сервером через заголовок Set-Cookie.
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Функция для выхода из приложения.
   *
   * Отправляет запрос на сервер для завершения сессии.
   *
   * @returns {Promise<void>} Промис, который разрешается после завершения запроса.
   */
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.example.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Ошибка выхода');
      }
      // Дополнительная логика, например, очистка состояния пользователя
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, searchHotels, updateHotel, login, logout };
}
