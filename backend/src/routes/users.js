const router = require('express').Router()
const controller = require('../controllers/users')
const { checkAuthenticated } = require('../controllers/auth')

// TODO: only admin can have access to these routes
router.get('/', checkAuthenticated, controller.getUsers) // GET /users
router.post('/', checkAuthenticated, controller.createUser) // POST /users
router.get('/:userUuid', checkAuthenticated, controller.getUser) // GET /users/:userUuid
router.put('/:userUuid', checkAuthenticated, controller.updateUser) // PUT /users/:userUuid
router.delete('/:userUuid', checkAuthenticated, controller.deleteUser) // DELETE /users/:userUuid

module.exports = router