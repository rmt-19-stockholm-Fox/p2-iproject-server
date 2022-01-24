const router = require('express').Router()
const { application } = require('express')
const accountRouter = require('./accountRoutes')

router.use('/account', accountRouter)

module.exports = router
