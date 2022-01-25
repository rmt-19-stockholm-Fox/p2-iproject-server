const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.findAllCategories)

module.exports = router