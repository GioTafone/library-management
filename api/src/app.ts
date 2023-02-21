import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import bookRouter from './routers/book.router'
import userRouter from './routers/user.router'
import authorRouter from './routers/author.router'
import loginWithGoogle from './passport/google'
import { JWT_SECRET } from './util/secrets'
import Role from './models/Role'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.session())
*/
app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/authors', authorRouter)
//the route below is for simplicity, need to create a separete Auth Route and handling things there
//pass the passport.authenticate as middleware and the strategy, in this case google-id-token
app.post(
  '/api/v1/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    //=====Type to refactor==== Extend class???
    //==== User Document Type=====
    const user = req.user as any

    //generates the token to give to user
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ token })
  }
)

app.post('/api/v1/role', (req, res) => {
  const role = new Role({
    roleName: 'ADMIN',
    permissions: ['BOOK_READ', 'BOOK_DELETE', 'BOOK_UPDATE', 'BOOK_CREATE'],
  })
  role.save()
  res.json({ role })
})
// Custom API error handler
app.use(apiErrorHandler)

export default app
