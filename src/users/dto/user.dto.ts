import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'password minimum length should be 6 symbols' })
  password: string;

  @IsString()
  username: string;
}
