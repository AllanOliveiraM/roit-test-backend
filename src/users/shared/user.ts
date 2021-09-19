import { Document } from 'mongoose'

import { UserAdress } from './types/user.types'

export class User extends Document {
  'customId': number

  name: string

  birthDate: string

  githubUsername: string

  adress: UserAdress
}
