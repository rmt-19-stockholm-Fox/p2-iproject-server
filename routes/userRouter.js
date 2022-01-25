const express = require('express')
const { CompareHash, SignToken } = require('../helper/helpers.js')
const userRouter = express.Router()
const {User} = require('../models/index.js')


userRouter.post('/register', async (req, res, next) => {
  try {
    const {email, password} = req.body
    const newUser = await User.create({
      email: email,
      password: password,
    })

    res.status(201).json({
      id: newUser.id,
      email: newUser.email
    })

  } catch (error) {
    next(error)
  }
})

userRouter.post('/login', async (req,res,next) => {
  try {
    const {email, password} = req.body;
    if(!email) {
      throw {name: "EMAIL_EMPTY"}
    }
    if(!password) {
      throw {name: "PASSWORD_EMPTY"}
    }
    const user = await User.findOne({
      where: {
        email:email
      }
    })
    if(!user || !CompareHash(password, user.password)) {
      throw {name: "INVALID_EMAIL_PASSWORD"}
    }
    let payload = {
      id: user.id
    }
    res.status(200).json({
      access_token: SignToken(payload)
    })
    
  } catch (error) {
    next(error)
  }
})


module.exports = userRouter