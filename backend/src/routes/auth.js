const router = require('express').Router()
const controller = require('../controllers/auth')

router.post('/register', controller.checkNotAuthenticated, controller.registerUser) // POST /auth/register
router.post('/login', controller.checkNotAuthenticated, controller.loginUser) // POST /auth/login
router.delete('/logout', controller.checkAuthenticated, controller.logoutUser) // DELETE /auth/logout

module.exports = router