require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandles')
const route = require('./routes')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { jwtVerify } = require('./helpers/jwt')
const httpServer = createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let arrOfUser = []
let arrOfChats = []

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

app.use(route, errorHandler)

io.on('connection', (socket) => {
  console.log('A User Connect', socket.id)
  socket.on('disconnect', () => {
    console.log('A user disconnect')
  })
  socket.on("forRefresh", (payload) => {
    socket.emit('receiveMessageFromServer', arrOfChats)
  })
  socket.on("setUsername", (payload) => {
    arrOfUser.push({
      username: payload,
      status: 'online'
    })
  })
  socket.on('sendMessageToServer', (payload => {
    const access_token = payload.access_token
    const payloadtoken = jwtVerify(access_token)
    const pushThis = {
      message: payload.message,
      email: payloadtoken.email,
      role: payloadtoken.role
    }
    arrOfChats.push(pushThis)
    io.emit('RECMESSERVER', arrOfChats)
  }))
})


// httpServer.listen(port, () => {
//   console.log('listening on port ' + port)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app