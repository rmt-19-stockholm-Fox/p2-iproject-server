const { User } = require('../models')

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
}

module.exports = { controller }