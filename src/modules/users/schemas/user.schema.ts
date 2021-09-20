import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export const MODEL_NAME = 'User'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

UserSchema.plugin(uniqueValidator)

export { UserSchema }
