// require('dotenv').config()
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
