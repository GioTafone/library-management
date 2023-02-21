import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import authorService from '../services/author.service'
import { BadRequestError } from '../helpers/apiError'

// GET /authors
export const findAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await authorService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST /authors
export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, books } = req.body

    const author = new Author({
      firstName,
      lastName,
      books,
    })

    await authorService.create(author)
    res.json(author)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /authors/id/:auhtorId
export const findAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await authorService.findById(req.params.authorId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /authors/id/:auhtorId
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updateAuthor = await authorService.update(authorId, update)
    res.json(updateAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /authors/id/:auhtorId
export const deleteAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authorService.deleteAuthor(req.params.authorId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
