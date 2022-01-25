const express = require('express')
const indexRouter = express.Router()
const userRouter = require('./userRouter.js')


indexRouter.use('/', userRouter)


module.exports = indexRouter