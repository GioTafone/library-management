import passport from 'passport'

passport.serializeUser(function (user, done) {
  done(null, user)
})
//====Types to refactor====
passport.deserializeUser(function (user: any, done) {
  done(null, user)
})
