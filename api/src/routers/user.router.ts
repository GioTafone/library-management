import express from 'express'

import {
  createUser,
  findAll,
  findById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', findAll)
router.post('/', createUser)
router.get('/:userId', findById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
