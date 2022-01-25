const express = require('express')
const shopRouter = express.Router()
const {Shop} = require('../models/index.js')


shopRouter.post('/register', async(req,res,next)=>{
  try {
    const {name, imageUrl, motto, address, category} = req.body

  } catch (error) {
    next(error)
  }
})

module.exports = shopRouter