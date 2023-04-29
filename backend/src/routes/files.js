const router = require('express').Router()
const controller = require('../controllers/files')

router.get('/', controller.getFiles) // GET /files
router.post('/', controller.createFile) // POST /files
router.get('/:fileUuid', controller.getFile) // GET /files/:fileUuid

module.exports = router