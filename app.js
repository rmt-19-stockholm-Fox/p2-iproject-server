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
app.get(`/findplace`, Cont.findMeThePlace);
app.get(`/findhotel`, Cont.findMeTheHotel);

app.listen(port, () => {
  console.log(`islisting to ${port}`);
});

// method: 'GET',
// url: 'https://hotels4.p.rapidapi.com/properties/list',
// params: {
//   destinationId: '1506246',
//   pageNumber: '1',
//   pageSize: '25',
//   checkIn: '2020-01-08',
//   checkOut: '2020-01-15',
//   adults1: '1',
//   sortOrder: 'PRICE',
//   locale: 'en_US',
//   currency: 'USD'
// },
// headers: {
//   'x-rapidapi-host': 'hotels4.p.rapidapi.com',
//   'x-rapidapi-key': '20bc14ab13mshe9ae0d74b989891p1852c9jsn633de4c10659'
// }
// };
