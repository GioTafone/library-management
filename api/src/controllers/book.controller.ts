import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import { BorrowBook } from '../types'
import bookService from '../services/book.service'
import { BadRequestError } from '../helpers/apiError'

// GET /books
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/:borrowerId
export const findUserBorrows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findUserBorrows(req.params.borrowerId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      isbn,
      title,
      description,
      publisher,
      authors,
      category,
      isAvailable,
      borrowerId,
      publishedYear,
      borrowDate,
      returnDate,
    } = req.body

    // const Book = z.object({
    //   isbn: z.number(),
    //   title: z.string(),
    //   description: z.string()
    //   publisher: z.string(),
    // })

    const book = new Book({
      isbn,
      title,
      description,
      publisher,
      authors,
      category,
      isAvailable,
      borrowerId,
      publishedYear,
      borrowDate,
      returnDate,
    })

    await bookService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/id/:bookId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/id/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await bookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/id/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/isbn/:bookIsbn
export const findByIsbn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findByIsbn(req.params.bookIsbn))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/filter?
export const filterByAttribute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queries = []
    const allowedQueries = [
      'title',
      'authors',
      'isAvailable',
      'category',
      'publishedYear',
      //to check the line below
      'authors.lastName',
    ] 
    for (const key in req.query) {
      const value = req.query[key]
      const isAllowedKey = allowedQueries.includes(key)
      if (isAllowedKey) {
        queries.push({ [key]: value })
      }
    }

    console.log(queries)
    res.json(await bookService.filterByAttribute(queries))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/isbn/:bookIsbn/borrow
export const issueBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrow: BorrowBook = {
      borrowerId: req.body.borrowerId,
      isAvailable: false,
    }
    const bookIsbn = req.params.bookIsbn
    const borrowedBook = await bookService.borrowAndReturn(bookIsbn, borrow)
    res.json(borrowedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/borrow/:bookId
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrow: BorrowBook = {
      borrowerId: req.body.borrowerId,
      isAvailable: false,
    }
    const bookId = req.params.bookId
    const borrowedBook = await bookService.borrowAndReturn(bookId, borrow)
    res.json(borrowedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/return/:bookId
export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrow: BorrowBook = {
      borrowerId: null,
      isAvailable: true,
    }
    const bookId = req.params.bookId
    const borrowedBook = await bookService.borrowAndReturn(bookId, borrow)
    res.json(borrowedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
