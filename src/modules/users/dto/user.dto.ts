import type { Email, Password } from '../../../types/models'

export class UserDto {
  name: string

  email: Email

  password: Password
}
