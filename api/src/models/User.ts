import mongoose, { Document } from 'mongoose'
import { UserDocument } from '../types'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  // activeBorrows: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Book',
  // },
  // isBanned: {
  //   type: Boolean,
  //   required: true,
  // },
})

export default mongoose.model<UserDocument>('User', userSchema)
