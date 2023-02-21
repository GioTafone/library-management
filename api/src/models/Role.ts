import mongoose from 'mongoose'
import { Permission, RoleDocument } from '../types'

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    default: 'USER',
  },
  permissions: {
    type: [String],
    enum: Object.values(Permission),
    default: [Permission.BOOK_READ],
    required: true,
  },
})

export default mongoose.model<RoleDocument>('Role', roleSchema)
