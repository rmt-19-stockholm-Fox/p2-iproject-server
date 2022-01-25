const express = require('express')
const router = express.Router()
const bookmarkController = require('../controllers/bookmarkController')
const {authentication, bookmarkAuthorization} = require('../middlewares/auth')

router.get('/', authentication, bookmarkAuthorization, bookmarkController.findAllBookmark)
router.post('/', authentication, bookmarkAuthorization, bookmarkController.addBookmark)
router.delete('/:ProductId', authentication, bookmarkAuthorization, bookmarkController.deleteBookmark)

module.exports = router