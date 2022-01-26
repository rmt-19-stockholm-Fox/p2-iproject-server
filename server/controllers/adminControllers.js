const { User, TravelPost, Event } = require('../models')

class adminController {
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
            const dateFormat = new Date (req.body.schedule)
            console.log(dateFormat)
            const travelData = await TravelPost.findOne({where: {id: req.params.travelPostId}})
            if (!travelData) throw {name:'Data not found'}
            const { destination, imageUrl, price } = req.body
            const {travelPostId} = req.params
            const response = await Event.create({
                destination, imageUrl, schedule: dateFormat , price, travelPostId
            })
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }

    static async getEvents(req, res, next) {
        try {
            const travelData = await TravelPost.findOne({where: {id: req.params.travelPostId}})
            if (!travelData) throw {name:'Data not found'}
            const response = await Event.findAll({where: {travelPostId: req.params.travelPostId}})
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { adminController }