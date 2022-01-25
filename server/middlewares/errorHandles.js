function errorHandler(err, req, res, next) {
    // res.send(err)
    if (err.name === 'Invalid email/password') res.status(403).send({message: 'Invalid email/password'})
    if (err.name === 'Email cannot be empty') res.status(400).send({message: 'Email cannot be empty'})
    if (err.name === 'Password cannot be empty') res.status(400).send({message: 'Password cannot be empty'})
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send({message: err.errors[0].message})
    }
}

module.exports = errorHandler