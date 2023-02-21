import express from 'express'
import authentication from '../middlewares/authentication'
import validate, { bookSchema } from '../middlewares/validate'

import {
  createBook,
  findAll,
  findById,
  updateBook,
  deleteBook,
  findByIsbn,
  filterByAttribute,
  findUserBorrows,
  borrowBook,
  returnBook,
  // issueBook,
} from '../controllers/book.controller'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.post('/', validate(bookSchema), createBook)
router.get('/filter', filterByAttribute)
router.get('/user/:borrowerId', findUserBorrows)
router.get('/id/:bookId', findById)
router.put('/id/:bookId', validate(bookSchema), updateBook)
router.delete('/id/:bookId', deleteBook)
router.get('/isbn/:bookIsbn', authentication, findByIsbn)
// router.put('/isbn/:bookIsbn/borrow', issueBook)
router.put('/borrow/:bookId', authentication, borrowBook)
router.put('/return/:bookId', returnBook)

export default router
