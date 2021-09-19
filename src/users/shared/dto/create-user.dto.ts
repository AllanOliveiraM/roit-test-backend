import { UserAdress } from '../types/user.types'

export class CreateUserDto {
  id: number

  name: string

  birthDate: string

  githubUsername: string

  adress: UserAdress
}
