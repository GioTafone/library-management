import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  books: string[]
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    //lastName not required, since author can have only one name
    type: String,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
