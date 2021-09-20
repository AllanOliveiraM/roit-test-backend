import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateAdressDto {
  @IsString()
  @IsNotEmpty()
  cep: string

  @IsString()
  @IsNotEmpty()
  state: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  number: string

  @IsString()
  @IsOptional()
  complement: string
}
