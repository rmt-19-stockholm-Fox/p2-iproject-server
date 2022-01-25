const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const indexRouter = require('./routes/index.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/', indexRouter) 


app.use((err,req,res,next)=>{
  let statusCode = 500;
  let errorMsg = "Internal server error"

  if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    errorMsg = err.errors[0].message
  } else if(err.name === 'EMAIL_EMPTY') {
    statusCode = 400;
    errorMsg = "Email is required"
  } else if(err.name === 'PASSWORD_EMPTY') {
    statusCode = 400;
    errorMsg = "Password is required"
  }

  res.status(statusCode).json({
    message: errorMsg
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})