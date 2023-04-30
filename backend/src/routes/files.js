const router = require('express').Router()
const controller = require('../controllers/files')
const { checkAuthenticated } = require('../controllers/auth')

router.get('/', checkAuthenticated, controller.getFiles) // GET /files
router.post('/', checkAuthenticated, controller.createFile) // POST /files
router.get('/:fileid', checkAuthenticated, controller.getFile) // GET /files/:fileid

module.exports = router