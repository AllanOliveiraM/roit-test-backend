import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  customId: Number,
  name: String,
  birthDate: String,
  githubUsername: String,
  adress: {
    cep: String,
    state: String,
    city: String,
    neighborhood: String,
    street: String,
    number: String,
    complement: String,
  },
})
