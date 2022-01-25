const express = require('express')
const indexRouter = express.Router()
const userRouter = require('./userRouter.js')
const shopRouter = require('./shopRouter.js')
const Authentication = require('../Middlewares/Authentication.js')

indexRouter.use('/', userRouter)

indexRouter.use(Authentication)

indexRouter.use('/shop', shopRouter)

module.exports = indexRouter