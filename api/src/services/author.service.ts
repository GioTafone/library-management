import Author from '../models/Author'
import { AuthorDocument } from '../types'
import { NotFoundError } from '../helpers/apiError'

const create = async (author: AuthorDocument): Promise<AuthorDocument> => {
  return author.save()
}

const findAll = async (): Promise<AuthorDocument[]> => {
  return Author.find().sort({ name: 1 }).populate('books')
}

const findById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId).populate('books')

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const update = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundAuthor = Author.findByIdAndDelete(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

export default {
  create,
  findAll,
  findById,
  update,
  deleteAuthor,
}
