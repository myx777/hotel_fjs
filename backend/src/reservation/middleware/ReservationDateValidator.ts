import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Кастомный валидатор даты окончания бронирования
 * @param dateEnd Дата окончания бронирования
 * @param arg Дополнительные метаданные, связанные с процессом валидации
 */

@ValidatorConstraint({ name: 'ReservationDateValidator', async: false })
export class ReservationDateValidator implements ValidatorConstraintInterface {
  validate(dateEnd: Date, args: ValidationArguments) {
    // object — сам объект, который валидируется.
    const { dateStart } = args.object as any;
    return dateEnd > dateStart;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Дата окончания бронирования должна быть позже даты началаю';
  }
}
