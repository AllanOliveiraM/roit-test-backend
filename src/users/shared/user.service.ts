import { Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  // Temp in-memory fake data store
  data: CreateUserDto[] = [
    {
      id: 1,
      name: 'Allan',
      birthDate: 'isodate-temp',
      githubUsername: 'AllanOliveiraM',
      adress: {
        cep: '96010165',
        state: 'RS',
        city: 'Pelotas',
        neighborhood: 'Centro',
        street: 'Tiradentes',
        number: '12345',
        complement: 'Apt. 1',
      },
    },
  ]

  getAll(): CreateUserDto[] {
    return this.data
  }
}
