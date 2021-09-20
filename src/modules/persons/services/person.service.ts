import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Document } from 'mongoose'

import { CreatePersonDto } from '../dto/create-person.dto'
import { PersonDto } from '../dto/person.dto'
import { UpdatePersonDto } from '../dto/update-person.dto'
import { MODEL_NAME } from '../schemas/person.schema'

import type { Id } from '../../../types/models'

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(MODEL_NAME) private readonly PersonModel: Model<PersonDto & Document>
  ) {}

  async getAll() {
    return await this.PersonModel.find().exec()
  }

  async getById(id: Id) {
    return await this.PersonModel.findById(id).exec()
  }

  async create(user: CreatePersonDto) {
    const createdPerson = new this.PersonModel(user)

    return await createdPerson.save()
  }

  async update(id: Id, user: UpdatePersonDto) {
    await this.PersonModel.updateOne({ _id: id }, user).exec()

    return this.getById(id)
  }

  async delete(id: Id) {
    return await this.PersonModel.deleteOne({ _id: id }).exec()
  }
}
