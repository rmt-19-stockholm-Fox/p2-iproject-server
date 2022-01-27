const { jwtVerify } = require("../helpers/jwt")
const { User } = require('../models')

async function authorization (req, res, next) {
    try {
        if(req.headers.access_token === '' || !req.headers.access_token) throw {name: 'Invalid Token'}
        const access_token = req.headers.access_token
        const payload = jwtVerify(access_token)
        const userData = User.findOne({where: {id: payload.id}})
        if (!userData) throw {name: 'Invalid Token'}
        req.payload = payload
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization