const { comparePassword } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')
const { User, TravelPost, Event } = require('../models')

class controller {
    static async register(req, res, next) {
        try {
            const response = await User.create({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }) 
            res.status(201).send({id: response.id, email:response.email, role:response.role})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            if(req.body.email === '' || !req.body.email) throw {name: 'Email cannot be empty'}
            if(req.body.password === '' || !req.body.password) throw {name: 'Password cannot be empty'}
            const response = await User.findOne({
                where: {email: req.body.email}
            }) 
            if(!response) throw {name: 'Invalid email/password'}
            const isValid = comparePassword(req.body.password, response.password)
            if(!isValid) throw {name: 'Invalid email/password'}
            const payload = {id: response.id, email:response.email, role:response.role}
            const access_token = jwtSign(payload)
            res.status(200).send({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async postTravel(req, res, next) {
        try {
            const { name, summary, date, imageUrl } = req.body
            const response = await TravelPost.create({
                name, summary, date, imageUrl, userId: req.payload.id
            })
            res.send(response)
        } catch (error) {
            next(error)
        }
    }

    static async postEvents(req, res, next) {
        try {
            const travelData = await TravelPost.findOne({where: {id: req.params.travelPostId}})
            if (!travelData) throw {name:'Data not found'}
            const { destination, imageUrl, schedule, price } = req.body
            const {travelPostId} = req.params
            const response = await Event.create({
                destination, imageUrl, schedule, price, travelPostId
            })
            res.send(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { controller }