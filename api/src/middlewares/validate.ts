import { z, AnyZodObject, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

import { BadRequestError } from '../helpers/apiError'

export const bookSchema = z.object({
  body: z.object({
    isbn: z.string({ required_error: 'Isbn is required' }),
    title: z.string({ required_error: 'Title is required' }),
    description: z.optional(z.string()),
    publisher: z.optional(z.string()),
    category: z.optional(z.string()),
    publishedYear: z.string({ required_error: 'Year is required' }),
  }),
})

export const authorSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'Fisrt Name is required' }).min(1),
  }),
})

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new BadRequestError(error.issues[0].message, 400, error))
      }
      next(error)
    }
  }

export default validate
