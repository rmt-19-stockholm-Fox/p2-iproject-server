const express = require(`express`);
const app = express();
const port = 3000;
const cors = require(`cors`);
const Cont = require(`./controllers/controllers`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(`/register`, Cont.register);
