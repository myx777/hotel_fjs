import { Message } from "src/support-request/schemas/Message.schema";
import { SupportRequest } from "src/support-request/schemas/Support-request.schema";
import { SendMessageDto } from "../Send-message.dto";
import { CreateSupportRequestDto } from "../Create-support-request.Dto";
import { MarkMessagesAsReadDto } from "../Mark-messages-as-read-dto";
import { GetChatListParams } from "./Get-chat-list-params.interface";

/**
 * Сервис для работы с клиентскими запросами.
 *
 * @description Этот интерфейс предоставляет методы для создания запросов и работы с непрочитанными сообщениями для клиента.
 */
export interface ISupportRequestClientService {
    /**
     * Создает новый запрос в техподдержку.
     * @param {CreateSupportRequestDto} data - Данные для создания запроса.
     * @returns {Promise<SupportRequest>} - Новый запрос в техподдержку.
     */
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  
    /**
     * Помечает сообщения как прочитанные для определенного запроса.
     * Выставляет текущую дату в поле `readAt` для всех сообщений,
     * которые были отправлены сотрудниками поддержки и не отмечены как прочитанные.
     * @param {MarkMessagesAsReadDto} params - Параметры для пометки сообщений.
     */
    markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  
    /**
     * Получает количество непрочитанных сообщений, отправленных сотрудниками поддержки.
     * @param {string} supportRequest - ID запроса на поддержку.
     * @returns {Promise<number>} - Количество непрочитанных сообщений.
     */
    getUnreadCount(supportRequest: string): Promise<number>;
  }
  
  /**
   * Сервис для работы с запросами техподдержки для сотрудников.
   *
   * @description Этот интерфейс включает методы для работы с запросами, обработки сообщений и закрытия запросов.
   */
  export interface ISupportRequestEmployeeService {
    /**
     * Помечает сообщения как прочитанные для определенного запроса.
     * Выставляет текущую дату в поле `readAt` для всех сообщений,
     * которые были отправлены пользователем и не отмечены как прочитанные.
     * @param {MarkMessagesAsReadDto} params - Параметры для пометки сообщений.
     */
    markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  
    /**
     * Получает количество непрочитанных сообщений, отправленных пользователем.
     * @param {string} supportRequest - ID запроса на поддержку.
     * @returns {Promise<number>} - Количество непрочитанных сообщений.
     */
    getUnreadCount(supportRequest: string): Promise<number>;
  
    /**
     * Закрывает запрос поддержки.
     * Устанавливает флаг `isActive` в значение `false`.
     * @param {string} supportRequest - ID запроса на поддержку.
     * @returns {Promise<void>} - Завершает процесс закрытия запроса.
     */
    closeRequest(supportRequest: string): Promise<void>;
  }
  
  /**
   * Сервис поддержки запросов.
   *
   * @description Этот интерфейс определяет методы для работы с запросами и сообщений в техподдержку.
   */
  export interface ISupportRequestService {
    /**
     * Находит все запросы поддержки для указанного пользователя.
     * @param {GetChatListParams} params - Параметры для фильтрации запросов.
     * @returns {Promise<SupportRequest[]>} - Список запросов поддержки.
     */
    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  
    /**
     * Отправляет новое сообщение в чат поддержки.
     * @param {SendMessageDto} data - Данные для отправки сообщения.
     * @returns {Promise<Message>} - Отправленное сообщение.
     */
    sendMessage(data: SendMessageDto): Promise<Message>;
  
    /**
     * Получает все сообщения для определенного запроса.
     * @param {string} supportRequest - ID запроса на поддержку.
     * @returns {Promise<Message[]>} - Список сообщений для данного запроса.
     */
    getMessages(supportRequest: string): Promise<Message[]>;
  
    /**
     * Подписывается на новые сообщения в запросе поддержки.
     * Реализуется через EventEmitter и отправляет оповещения при добавлении новых сообщений.
     * @param {Function} handler - Обработчик новых сообщений.
     * @returns {Function} - Функция для отписки от событий.
     */
    subscribe(
      handler: (supportRequest: SupportRequest, message: Message) => void
    ): () => void;
  }
  