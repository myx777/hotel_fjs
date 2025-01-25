import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO для отправки сообщения.
 *
 * @description Этот класс используется для передачи данных при отправке нового сообщения в рамках заявки на поддержку.
 * @property {string} author - ID автора сообщения.
 * @property {string} supportRequest - ID заявки, к которой относится сообщение.
 * @property {string} text - Текст сообщения.
 */
export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  supportRequest: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
