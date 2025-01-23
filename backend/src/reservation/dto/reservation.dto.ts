import {
  IsDate,
  IsNotEmpty,
  IsString,
  MinDate,
  Validate,
} from 'class-validator';
import { ReservationDateValidator } from '../middleware/ReservationDateValidator';
/**
 * DTO для создания новой брони.
 * 
 * Этот класс используется для передачи данных при создании брони. Включает в себя валидацию данных для каждого поля.
 * Поля проходят проверку с помощью декораторов `class-validator`.
 * 
 * ReservationDateValidator используется для валидации даты.
 */
export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  hotelId: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsDate()
  @MinDate(() => new Date())
  dateStart: Date;

  @IsNotEmpty()
  @IsDate()
  @MinDate(() => new Date())
  @Validate(ReservationDateValidator)
  dateEnd: Date;
}
