import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

/**
 * DTO для отметки сообщений как прочитанных.
 *
 * @description Этот класс используется для передачи данных при отметке сообщений как прочитанных в рамках определенной заявки.
 * @property {string} user - ID пользователя, выполняющего действие.
 * @property {string} supportRequest - ID заявки, сообщения которой помечаются как прочитанные.
 * @property {Date} createdBefore - Дата и время, до которых сообщения считаются прочитанными.
 */
export class MarkMessagesAsReadDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  supportRequest: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) 
  createdBefore: Date;
}
