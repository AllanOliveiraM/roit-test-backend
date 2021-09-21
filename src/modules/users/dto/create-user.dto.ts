import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator'

import type { Email, Password } from '../../../types/models'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: Email

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  password: Password
}
