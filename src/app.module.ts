import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import {
  USE_CONNECTION_STRING,
  CONNECTION_STRING,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} from './environment/env'
import { PersonsModule } from './modules/persons/persons.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      USE_CONNECTION_STRING === 'true' && CONNECTION_STRING !== 'undefined'
        ? String(CONNECTION_STRING)
        : `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
    ),
    PersonsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
