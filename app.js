// if(process.env.NODE_ENV !== "production") {
//   require('dotenv').config()
// }

const express = require('express')
const app = express()
const port = process.env.PORT || 3300
const cors = require('cors')
const router = require('./routes/index')
const errorhandler = require('./middleware/errorhandler')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router)

app.use(errorhandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})