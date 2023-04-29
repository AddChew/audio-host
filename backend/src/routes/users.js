const router = require('express').Router()
const controller = require('../controllers/users')
const { checkAuthenticated, checkIsAdmin } = require('../controllers/auth')

router.get('/', checkAuthenticated, checkIsAdmin, controller.getUsers) // GET /users
router.post('/', checkAuthenticated, checkIsAdmin, controller.createUser) // POST /users
router.get('/:userUuid', checkAuthenticated, checkIsAdmin, controller.getUser) // GET /users/:userUuid
router.put('/:userUuid', checkAuthenticated, checkIsAdmin, controller.updateUser) // PUT /users/:userUuid
router.delete('/:userUuid', checkAuthenticated, checkIsAdmin, controller.deleteUser) // DELETE /users/:userUuid

module.exports = router