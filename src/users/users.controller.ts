import { Controller, Get } from '@nestjs/common'

import { CreateUserDto } from './shared/dto/create-user.dto'
import { UserService } from './shared/user.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<CreateUserDto[]> {
    return this.userService.getAll()
  }
}
