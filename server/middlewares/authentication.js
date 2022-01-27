async function authenticationAdmin (req, res, next) {
    try {
        if(req.payload.role !== 'admin') throw { name: 'You are not authorized'}
        next()
    } catch (error) {
        next(error)
    }
}

async function authenticationCustomer (req, res, next) {
    try {
        if(req.payload.role !== 'customer') throw { name: 'You are not authorized'}
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authenticationAdmin, authenticationCustomer }