import { Module } from '@nestjs/common'

import { GithubService } from './shared/github.service'
import { UserService } from './shared/user.service'
import { UsersController } from './users.controller'

@Module({
  controllers: [UsersController],
  providers: [GithubService, UserService],
})
export class UsersModule {}
