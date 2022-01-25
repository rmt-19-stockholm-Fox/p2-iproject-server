const express = require('express')
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


module.exports = userRouter