const express = require('express')
const app = express()
const port = 3000

app.post('/register', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

app.get('/', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

app.get('/', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

app.get('/', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

app.get('/', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

app.use((err,req,res,next)=>{
  let statusCode = 500;
  let errorMsg = "Internal server error"



  res.status(statusCode).json({
    message: errorMsg
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})