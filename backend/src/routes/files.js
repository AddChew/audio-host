const router = require('express').Router()
const controller = require('../controllers/files')
const { checkAuthenticated } = require('../controllers/auth')

router.get('/', checkAuthenticated, controller.getFiles) // GET /files
router.post('/', checkAuthenticated, controller.createFile) // POST /files
router.get('/:fileUuid', checkAuthenticated, controller.getFile) // GET /files/:fileUuid

module.exports = router