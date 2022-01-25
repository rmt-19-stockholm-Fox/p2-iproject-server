const {validateJWT} = require('../helpers/jwt')
const {User, Product} = require('../models')

function authentication(req, res, next) {
    const access_token = req.headers.access_token

    if(access_token) {
        try {
            const payload = validateJWT(access_token) 
            
            User.findByPk(payload.id)
            .then((user) => {
                if(user) {
                    req.user = {id: user.id, role: user.role, email:user.email}
                    next()
                }
                else {
                    res.status(401).json({message: 'Invalid or wrong JWT'})
                }
            })
            .catch((err) => {
                res.status(401).json({message: err.message})
            })
        } 
        catch (err) {
            res.status(401).json({message: 'Invalid or wrong JWT'})
        }  
    }
    else {
        res.status(401).json({message: 'Please login first'})
    }
}

function addProductAuthorization(req, res, next) {
    if(req.user.role === "Artist") {
        next()
    }
    else {
        res.status(403).json({message: 'Forbidden Access'})
    }
}

function editDeleteProductAuthorization(req, res, next) {
    Product.findByPk(req.params.id)
    .then((result) => {
        if (result) {
            if (req.user.role === "Artist" && req.user.id === result.UsersId) {
                next()
            }
            else {
                res.status(403).json({message: 'Forbidden Access'})
            }
        }
        else {
            res.status(404).json({message: 'Data not found'})
        }  
    })
    .catch(() => {
        res.status(500).json({message: 'Internal Server Error'})
    })
}

function bookmarkAuthorization(req, res, next) {
    if (req.user.role === "Customer") {
        next()
    }
    else {
        res.status(403).json({message: 'Forbidden Access'})
    }
}

module.exports = { authentication, addProductAuthorization, editDeleteProductAuthorization, bookmarkAuthorization }