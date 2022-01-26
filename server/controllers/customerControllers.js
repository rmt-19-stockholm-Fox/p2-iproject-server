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
            const amount = priceCalculating(travelData.Events)
            const response = await Booking.create({
                userId: req.payload.id,
                postId: req.params.postId,
                amount: amount
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
            console.log(req.body.postId)
            const postId = req.body.postId
            const response = await Booking.findOne({where:{postId: postId, userId: req.payload.id}})
            if(!response) throw {name:'Data not found'}
            const data = await midtrans(response.id, response.amount, req.payload.email)
            res.status(200).send({ token: data.token, bookingId: response.id })
        } catch (error) {
            next(error)
        }
    }
    static async patchSuccessPayment(req, res, next) {
        try {
            const response = await Booking.update(
                { paymentStatus: true },
                { where: { id: req.body.id } }
            )
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { customerController }