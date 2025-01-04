import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Email обязателен!' })
  email: string;

  @IsNotEmpty({ message: 'Пароль обязателен' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#*]).{8,128}$/, { 
    message: 'Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ (!#*)'
  })
  @Length(8, 128, { message: 'Пароль должен быть от 8 до 128 знаков' })
  password: string;

  @IsNotEmpty({ message: 'Имя обязателено' })
  name: string;

  @Length(10,10, {message: 'Номер телефона должен содержать 10 цифр'})
  @Matches(/^\d{10}$/, {message: 'Не верно введен номер телефона!'})
  contactPhone: string;

  @IsNotEmpty({ message: 'Роль должна быть обязателена' })
  role: string;
}