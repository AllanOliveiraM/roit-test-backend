import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model, Document } from 'mongoose'

import { CreateUserDto } from '../dto/create-user.dto'
import { RedefinePasswordDto } from '../dto/redefine-password.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDto } from '../dto/user.dto'
import { MODEL_NAME } from '../schemas/user.schema'

import type { Id } from '../../../types/models'

type UserDtoFactory = UserDto | UpdateUserDto | CreateUserDto | (UserDto & Document)

const userFactory = (user: UserDtoFactory, passwordOrHash?: string) => ({
  name: user.name,
  email: user.email,
  ...(passwordOrHash && { password: passwordOrHash }),
})

const userIdFactory = (user: UserDto & Document) => ({
  // eslint-disable-next-line no-underscore-dangle
  _id: user._id,
})

const fullUserFactory = (user: UserDto & Document) => ({
  ...userFactory(user),
  ...userIdFactory(user),
})

@Injectable()
export class UserService {
  constructor(
    @InjectModel(MODEL_NAME) private readonly UserModel: Model<UserDto & Document>
  ) {}

  async getAll() {
    const users = await this.UserModel.find().exec()

    return users.map(user => fullUserFactory(user))
  }

  async getById(id: Id) {
    const user = await this.UserModel.findById(id).exec()

    return fullUserFactory(user)
  }

  async create(user: CreateUserDto) {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(user.password, salt)
    const hashedSensitiveUserData = userFactory(user, passwordHash)
    const createdUser = await new this.UserModel(hashedSensitiveUserData).save()

    return fullUserFactory(createdUser)
  }

  async update(id: Id, user: UpdateUserDto) {
    const oldUser = await this.UserModel.findById(id).exec()

    await this.UserModel.updateOne(
      { _id: id },
      userFactory(user, oldUser.password)
    ).exec()

    return this.getById(id)
  }

  async redefinePassword(data: RedefinePasswordDto) {
    const user = await this.UserModel.findById(data.id).exec()
    const isMatch = await bcrypt.compare(data.oldPassword, user.password)

    if (isMatch) {
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(data.newPasswordOne, salt)
      const isPasswordTwoMatch = await bcrypt.compare(data.newPasswordTwo, passwordHash)

      if (!isPasswordTwoMatch) {
        throw new HttpException('Invalid password two.', 400)
      }

      const hashedSensitiveUserData = userFactory(user, passwordHash)

      await this.UserModel.updateOne({ _id: data.id }, hashedSensitiveUserData).exec()

      return this.getById(data.id)
    }

    throw new HttpException('Invalid password.', 400)
  }

  async delete(id: Id) {
    return await this.UserModel.deleteOne({ _id: id }).exec()
  }
}
