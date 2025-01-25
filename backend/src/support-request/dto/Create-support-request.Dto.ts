import { IsNotEmpty, IsString } from "class-validator";

/**
 * DTO для создания запроса в поддержку.
 *
 * @description Этот класс используется для передачи данных при создании нового запроса в службу поддержки.
 * @property {string} user - ID пользователя, создающего запрос.
 * @property {string} text - Текст сообщения, связанного с запросом.
 */
export class CreateSupportRequestDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
