require("dotenv").config();

const express = require(`express`);
const app = express();
const cors = require(`cors`);
const port = 3000;
const Cont = require(`./controllers/controller.js`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/findtime`, Cont.findMeTheTime);

app.listen(port, () => {
  console.log(`islisting to ${port}`);
});
