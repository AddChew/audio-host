const router = require('express').Router()
const controller = require('../controllers/users')
const { checkAuthenticated, checkIsAdmin } = require('../controllers/auth')

router.get('/', checkAuthenticated, checkIsAdmin, controller.getUsers) // GET /users
router.post('/', checkAuthenticated, checkIsAdmin, controller.createUser) // POST /users
router.get('/:userid', checkAuthenticated, checkIsAdmin, controller.getUser) // GET /users/:userid
router.put('/:userid', checkAuthenticated, checkIsAdmin, controller.updateUser) // PUT /users/:userid
router.delete('/:userid', checkAuthenticated, checkIsAdmin, controller.deleteUser) // DELETE /users/:userid

module.exports = router