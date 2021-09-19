import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserSchema } from './schemas/user.schema'
import { GithubService } from './shared/github.service'
import { UserService } from './shared/user.service'
import { UsersController } from './users.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [GithubService, UserService],
})
export class UsersModule {}
