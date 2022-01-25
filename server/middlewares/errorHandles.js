function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send({message: err.errors[0].message})
    }
}

module.exports = errorHandler