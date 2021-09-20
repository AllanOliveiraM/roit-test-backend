import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'

import { CreateAdressDto } from './create-adress.dto'

export class CreatePersonDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  customId: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  birthDate: string

  @IsString()
  @IsNotEmpty()
  githubUsername: string

  @ValidateNested()
  @Type(() => CreateAdressDto)
  @IsNotEmpty()
  adress: CreateAdressDto
}
