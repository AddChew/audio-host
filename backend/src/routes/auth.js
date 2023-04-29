const passport = require('passport')
const router = require('express').Router()
const controller = require('../controllers/auth')
const LocalStrategy = require('passport-local').Strategy

passport.use('login', new LocalStrategy(controller.loginUser))
passport.serializeUser((user, done) => done(null, user.uuid))
passport.deserializeUser((uuid, done) => done(null, getUser(uuid)))

router.post('/register', controller.registerUser) // POST /auth/register
router.post('/login', passport.authenticate('login')) // POST /auth/login
router.delete('/logout', controller.logoutUser) // DELETE /auth/logout

module.exports = {
    router: router,
    passport: passport
}