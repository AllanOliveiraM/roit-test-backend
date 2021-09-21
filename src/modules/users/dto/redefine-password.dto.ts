import { IsNotEmpty, IsString, Length } from 'class-validator'

export class RedefinePasswordDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  oldPassword: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  newPasswordOne: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  newPasswordTwo: string
}
