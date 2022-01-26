require("dotenv").config()
const emilsender = process.env.EMAIL
const passwordsender = process.env.PASSWORD
const nodemailer = require("nodemailer");
const formatRupiah = require("./formatRupiah");
const priceCalculating = require("./priceCalculating");
// const dateFormating = require("./dateFormating");
// const formatRupiah = require('./formatRupiah')

async function nodemailerSend(email, name, data) {
  const totalPrice = priceCalculating(data.Events)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: `${emilsender}`,
      pass: `${passwordsender}`,
    },
  });
  const mailOption = {
    from: '',
    to: `${email}`,
    subject: `Hello ${name}`,
    text: `Hello ${name}`,
    html: `
    <h1>Your booking id : ${data.id}</h1>
    <h1>Your booking price ${formatRupiah(totalPrice)}</h1>
    <h1>Your booking start from ${data.date}</h1>
    `,
  }
  const info = await transporter.sendMail(mailOption);

  console.log("Message sent: %s", info.messageId);

}

module.exports = nodemailerSend

