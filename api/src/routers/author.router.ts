import express from 'express'

import {
  findAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthors,
  findAuthorById,
} from '../controllers/author.controller'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/', findAllAuthors)
router.post('/', createAuthor)
router.get('/id/:authorId', findAuthorById)
router.put('/id/:authorId', updateAuthor)
router.delete('/id/:authorId', deleteAuthors)

export default router
