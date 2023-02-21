import mongoose, { Document } from 'mongoose'
import { Category, BookDocument, BorrowBook } from '../types'

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
  },
  title: {
    type: String,
  },
  description: String,
  publisher: String,
  authors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Author',
  },
  category: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  publishedYear: {
    type: String,
  },
  // borrowDate: {
  //   type: Date,
  // },
  // returnDate: Date,
  //   rating: {
  //     type: Number,
  //     min: 0,
  //   },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
