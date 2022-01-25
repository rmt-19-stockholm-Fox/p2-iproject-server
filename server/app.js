require('dotenv').config()
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const { controller } = require('./controllers/controllers')
const errorHandler = require('./middlewares/errorHandles')
const authorization = require('./middlewares/authorization')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/register' ,controller.register)
app.post('/login' ,controller.login)

app.use(authorization)
app.post('/travel' ,controller.postTravel)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})