if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require(`express`);
const app = express();
const cors = require(`cors`);
const port = process.env.PORT || 3000;
const Cont = require(`./controllers/controller.js`);
const errhand = require(`./middlewares/errhand`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(`/findtime`, Cont.findMeTheTime);
app.post(`/findplace`, Cont.findMeThePlace);
app.post(`/findhotel`, Cont.findMeTheHotel);
app.use(errhand);

app.listen(port, () => {
  console.log(`islisting to ${port}`);
});
