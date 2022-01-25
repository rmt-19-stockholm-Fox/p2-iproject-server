const express = require('express')
const shopRouter = express.Router()
const {Shop} = require('../models/index.js')


shopRouter.post('/register', async(req,res,next)=>{
  try {
    const {name, imageUrl, motto, address, category} = req.body

    const newShop = await Shop.create({
      name : name,
      imageUrl : imageUrl,
      motto : motto,
      address : address,
      category : category,
      userId: req.currentUser.id,
    })

    res.status(201).json(newShop)
  } catch (error) {
    console.log(error);
    next(error)
  }
})

module.exports = shopRouter