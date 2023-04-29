const router = require('express').Router()
const controller = require('../controllers/users')

router.get('/', controller.getUsers) // GET /users
router.post('/', controller.createUser) // POST /users
router.get('/:userUuid', controller.getUser) // GET /users/:userUuid
router.put('/:userUuid', controller.updateUser) // PUT /users/:userUuid
router.delete('/:userUuid', controller.deleteUser) // DELETE /users/:userUuid

module.exports = router