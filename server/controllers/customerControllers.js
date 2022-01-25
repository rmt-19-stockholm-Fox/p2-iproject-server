const { Booking, TravelPost, User } = require('../models')

class customerController {
    static async postBooking(req, res, next) {
        try {
            const travelData = await TravelPost.findOne({ where: { id: req.params.postId } })
            if (!travelData) throw { name: 'Data not found' }
            const response = await Booking.create({
                userId: req.payload.id,
                postId: req.params.postId
            })
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
}

module.exports = { customerController }