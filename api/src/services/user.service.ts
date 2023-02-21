import User from '../models/User'
import { UserDocument } from '../types'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().populate('role').sort({ lastName: 1 })
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId).populate('roles')

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}
//=====BUG===== I get back a 404 error
// const findByEmail = async (email: string): Promise<UserDocument> => {
//   const foundUser = await User.findOne({ email })

//   if (!foundUser) {
//     throw new NotFoundError(`User ${email} not found`)
//   }

//   return foundUser
// }

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`user ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findAll,
  findById,
  update,
  deleteUser,
  // findByEmail,
}
