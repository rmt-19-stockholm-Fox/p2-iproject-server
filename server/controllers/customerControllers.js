const midtrans = require('../helpers/midtrans')
const nodemailerSend = require('../helpers/nodemailer')
const priceCalculating = require('../helpers/priceCalculating')
const { Booking, TravelPost, User, Event, Transaction } = require('../models')

class customerController {
    static async postBooking(req, res, next) {
        try {
            const travelData = await TravelPost.findOne({ 
                where: { id: req.params.postId },
                include: {
                    model: Event
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            if (!travelData) throw { name: 'Data not found' }
            const response = await Booking.create({
                userId: req.payload.id,
                postId: req.params.postId
            })
            nodemailerSend(req.payload.email, 'nama', travelData)
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }
    static async getBooking(req, res, next) {
        try {
            const response = await Booking.findAll({
                where: { userId: req.payload.id },
                include: [{
                    model: User,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                }, {
                    model: TravelPost,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }
    static async midtrans(req, res, next) {
        try {
            const response = await Transaction.create({amount:req.body.amount, userId: req.payload.id, status:false})
            const data = await midtrans(response.id, req.body.amount, req.payload.email)
            res.status(200).send({token: data.token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { customerController }