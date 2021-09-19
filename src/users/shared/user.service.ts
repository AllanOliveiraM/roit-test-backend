import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from './user'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getAll() {
    return await this.UserModel.find().exec()
  }

  async getById(id: string) {
    return await this.UserModel.findById(id).exec()
  }

  async create(user: User) {
    const createdUser = new this.UserModel(user)

    return await createdUser.save()
  }

  async update(id: string, user: User) {
    await this.UserModel.updateOne({ _id: id }, user).exec()

    return this.getById(id)
  }

  async delete(id: string) {
    return await this.UserModel.deleteOne({ _id: id }).exec()
  }
}
