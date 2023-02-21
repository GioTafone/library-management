import GoogleTokenStrategy from 'passport-google-id-token'

import { GOOGLE_CLIENT_ID } from '../util/secrets'
import { ParsedToken, VerifiedCallback } from '../types'
import User from '../models/User'
import Role from '../models/Role'
import userService from '../services/user.service'

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        // console.log('googleId:', googleId)
        // console.log('parsedToken:', parsedToken)

        // DEFAULT VALUE OF ROLE IS USER
        const userRole = await Role.findOne({ roleName: 'USER' })
        //=====BUG==== cannot find email
        // let user = await userService.findByEmail(parsedToken.payload.email)
        // console.log("USER", user)

        let user = await User.findOne({
          email: parsedToken.payload.email,
        })
        if (!user && userRole) {
          user = new User({
            firstName: parsedToken.payload.given_name,
            lastName: parsedToken.payload.family_name,
            email: parsedToken.payload.email,
            role: userRole,
          })
          user.save()
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}
