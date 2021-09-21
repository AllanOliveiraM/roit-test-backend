import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model, Document } from 'mongoose'

import { CreateUserDto } from '../dto/create-user.dto'
import { RedefinePasswordDto } from '../dto/redefine-password.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDto } from '../dto/user.dto'
import { MODEL_NAME } from '../schemas/user.schema'

import { userFactory, fullUserFactory } from '../../../utils/factories'

import type { Id, Email } from '../../../types/models'

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

  async getByEmail(email: Email) {
    return await this.UserModel.findOne({ email }).exec()
  }

  async create(user: CreateUserDto) {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(user.password, salt)
    const hashedSensitiveUserData = userFactory(user, passwordHash)
    const createdUser = await new this.UserModel(hashedSensitiveUserData).save()

    return fullUserFactory(createdUser)
  }

  async update(id: Id, user: UpdateUserDto, authUser) {
    const oldUser = await this.UserModel.findById(id).exec()

    if (authUser?.email !== oldUser?.email) {
      throw new HttpException('Uou have no authority over this user to edit it.', 400)
    }

    await this.UserModel.updateOne({ _id: id }, userFactory(user)).exec()

    return this.getById(id)
  }

  async redefinePassword(data: RedefinePasswordDto) {
    const user = await this.getByEmail(data.email)

    if (!user) {
      throw new HttpException('Invalid email.', 400)
    }

    const isMatch = await bcrypt.compare(data.oldPassword, user.password)

    if (!isMatch) {
      throw new HttpException('Invalid password.', 400)
    }

    const salt = await bcrypt.genSalt()
    const isOldPasswordMatchToNew = await bcrypt.compare(
      data.newPasswordOne,
      user.password
    )

    if (isOldPasswordMatchToNew) {
      throw new HttpException('The new password cannot be the same as the old one.', 400)
    }

    const passwordHash = await bcrypt.hash(data.newPasswordOne, salt)
    const isPasswordTwoMatch = await bcrypt.compare(data.newPasswordTwo, passwordHash)

    if (!isPasswordTwoMatch) {
      throw new HttpException('Invalid password two.', 400)
    }

    const hashedSensitiveUserData = userFactory(user, passwordHash)

    await this.UserModel.updateOne({ _id: user._id }, hashedSensitiveUserData).exec()

    return this.getById(user._id)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete(id: Id, user: any) {
    const userById = await this.getById(id)
    const authUserEmail = user?.email

    if (userById?.email !== authUserEmail) {
      throw new HttpException('Uou have no authority over this user to delete it.', 400)
    }

    return await this.UserModel.deleteOne({ _id: id }).exec()
  }
}
