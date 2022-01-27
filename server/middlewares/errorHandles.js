function errorHandler(err, req, res, next) {
    // res.send(err)
    if (err.name === 'Data not found') res.status(404).send({message: 'Data not found'})
    if (err.name === 'You are not authorized') res.status(403).send({message: 'Unauthorized'})
    if (err.name === 'JsonWebTokenError') res.status(401).send({message: 'Invalid Token'})
    if (err.name === 'Invalid Token') res.status(401).send({message: 'Invalid Token'})
    if (err.name === 'Invalid email/password') res.status(403).send({message: 'Invalid email/password'})
    if (err.name === 'Email cannot be empty') res.status(400).send({message: 'Email cannot be empty'})
    if (err.name === 'Password cannot be empty') res.status(400).send({message: 'Password cannot be empty'})
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send({message: err.errors[0].message})
    } else {
        res.status(500).send({message:"Internal server error"})
    }
}

module.exports = errorHandler