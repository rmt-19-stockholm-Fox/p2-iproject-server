const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt')
const {generateJWT} = require('../helpers/jwt')

class Controller {
    static registerArtist(req, res) {
        const input = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'Artist',
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }
        User.create(input)
        .then((result) => {
            res.status(201).json({
                id: result.id,
                username: result.username,
                email: result.email
            })
        })
        .catch((err) => {
            if(err.name === 'SequelizeValidationError') {
                const errMsgs = []

                err.errors.forEach((element) => {
                    errMsgs.push(element.message)
                })
                res.status(400).json({message: errMsgs})
            }
            else {
                res.status(500).json({message: err.message})
            }
        })
    }

    static registerCustomer(req, res) {
        const input = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'Customer',
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }
        User.create(input)
        .then((result) => {
            res.status(201).json({
                id: result.id,
                username: result.username,
                email: result.email
            })
        })
        .catch((err) => {
            if(err.name === 'SequelizeValidationError') {
                const errMsgs = []

                err.errors.forEach((element) => {
                    errMsgs.push(element.message)
                })
                res.status(400).json({message: errMsgs})
            }
            else {
                res.status(500).json({message: err.message})
            }            
        })
    }

    static login(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((result) => {
            if (result) {
                if (comparePassword(req.body.password, result.password)) {
                    const access_token = generateJWT({
                            id: result.id,
                            email: result.email
                    })
                    console.log(access_token)
                    const role = result.role
                    const username = result.username
                    res.status(200).json({access_token, role, username})
                }
                else {
                    res.status(401).json({message: 'Wrong email or password'})
                }
            }
            else {
                res.status(401).json({message: 'Wrong email or password'})
            }
        })
        .catch((err) => {
            console.log(err,'<<<<<<<<<<<<<<<<<<<<<<<<masuk eror login')
            res.status(500).json({message: err.message})
        })
    }
}

module.exports = Controller