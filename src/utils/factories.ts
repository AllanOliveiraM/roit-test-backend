import { Document } from 'mongoose'

import { CreateUserDto } from '../modules/users/dto/create-user.dto'
import { UpdateUserDto } from '../modules/users/dto/update-user.dto'
import { UserDto } from '../modules/users/dto/user.dto'

type UserDtoFactory = UserDto | UpdateUserDto | CreateUserDto | (UserDto & Document)

type UserDtoDocument = (UserDto & Document) | (UserDto & Pick<Document, '_id'>)

export const userFactory = (user: UserDtoFactory, passwordOrHash?: string) => ({
  name: user.name,
  email: user.email,
  ...(passwordOrHash && { password: passwordOrHash }),
})

export const userIdFactory = (
  user: UserDtoDocument | Omit<UserDtoDocument, 'password'>
) => ({
  _id: user._id,
})

export const fullUserFactory = (user: UserDtoDocument) => ({
  ...userFactory(user),
  ...userIdFactory(user),
})

export const simpleDtoFullUserFactory = (
  user: Omit<UserDto, 'password'> & Pick<Document, '_id'>
) => ({
  ...userFactory(user),
  ...userIdFactory(user),
})
