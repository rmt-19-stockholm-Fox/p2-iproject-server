require('dotenv').config();

const { initializeApp, cert } = require('firebase-admin/app');

initializeApp({
  credential: cert(require('./certs/google-service.json')),
  storageBucket: 'gs://instafood-93ec5.appspot.com'
});

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
