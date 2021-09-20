import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PersonsController } from './controllers/persons.controller'
import { MODEL_NAME, PersonSchema } from './schemas/person.schema'
import { PersonService } from './services/person.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MODEL_NAME,
        schema: PersonSchema,
      },
    ]),
  ],
  controllers: [PersonsController],
  providers: [PersonService],
})
export class PersonsModule {}
