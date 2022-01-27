const express = require('express');
const app = express();

app.use(require('cors')());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(require('./routes'));
app.use(require('./middlewares/error-handler'));

module.exports = app;
