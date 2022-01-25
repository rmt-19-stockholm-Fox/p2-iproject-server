const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register/artist', userController.registerArtist)
router.post('/register/customer', userController.registerCustomer)
router.post('/login', userController.login)

module.exports = router