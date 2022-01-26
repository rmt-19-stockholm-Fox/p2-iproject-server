const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRETKEY

function jwtSign(payload) {
    return jwt.sign(payload, secretKey)
}

function jwtVerify(token) {
    return jwt.verify(token, secretKey)
}

module.exports = { jwtSign, jwtVerify }