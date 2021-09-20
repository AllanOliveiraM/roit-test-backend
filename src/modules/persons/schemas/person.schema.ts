import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export const MODEL_NAME = 'Person'

const PersonSchema = new mongoose.Schema({
  customId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  birthDate: { type: String, required: true },
  githubUsername: { type: String, required: true, unique: true },
  adress: {
    cep: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: String,
  },
})

PersonSchema.plugin(uniqueValidator)

export { PersonSchema }
