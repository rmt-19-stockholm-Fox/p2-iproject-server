const axios = require('axios')
const AUTH_STRING = new Buffer.from(process.env.MIDTRANS).toString('base64')

async function midtrans(id, amount, email) {
    let midtrans = await axios.post("https://app.sandbox.midtrans.com/snap/v1/transactions", {
        "transaction_details": {
            "order_id": id,
            "gross_amount": amount
        },
        "customer_details": {
            "email": email,
        }
    }, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${AUTH_STRING}`
        }
    })
    return midtrans.data
}

module.exports = midtrans
