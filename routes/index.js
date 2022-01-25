const express = require('express')
const indexRouter = express.Router()
const userRouter = require('./userRouter.js')
const shopRouter = require('./shopRouter.js')

indexRouter.use('/', userRouter)



indexRouter.use('/shop', shopRouter)

module.exports = indexRouter