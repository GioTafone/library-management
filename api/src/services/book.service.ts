import Book from '../models/Book'
import { BookDocument, BorrowBook } from '../types'
// import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find()
    .sort({ title: 1, publishedYear: -1 })
    .populate('authors')
    .populate('borrowerId')
}

const findUserBorrows = async (borrowerId: string): Promise<BookDocument[]> => {
  return Book.find({ borrowerId: borrowerId }).sort({
    title: 1,
    publishedYear: -1,
  })
}

//====Types to refactor
const filterByAttribute = async (queries: any[]): Promise<BookDocument[]> => {
  return Book.find({
    $and: queries,
  }).populate('authors')
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId).populate('authors')

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findByIsbn = async (bookIsbn: string): Promise<BookDocument[]> => {
  const foundBook = await Book.find({ isbn: bookIsbn }).populate('authors')
  console.log('Book', foundBook)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookIsbn} not found`)
  }

  return foundBook
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const borrowAndReturn = async (
  bookId: string,
  borrow: BorrowBook
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, borrow, {
    new: true,
  }).populate('borrowerId')

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found or not available`)
  }
  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findAll,
  findById,
  update,
  deleteBook,
  findByIsbn,
  filterByAttribute,
  borrowAndReturn,
  findUserBorrows,
}
