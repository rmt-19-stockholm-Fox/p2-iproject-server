const errorhandler = (err, req, res, next) => {
  console.log(err, '<)<)<)<)<)<)');

  switch (err.name) {
    case "SequelizeValidationError":
      const msg = err.errors[0].message
      res.status(400).json({ message: msg })
      break;

    case "SequelizeUniqueConstraintError":
      const msgUnique = err.errors[0].message
      res.status(400).json({ message: msgUnique })
      break;

    case "emailReq":
      res.status(400).json({ message: 'Email is required' })
      break;

    case "passReq":
      res.status(400).json({ message: 'Password is required' })
      break;

    case "invalidLogin":
      res.status(400).json({ message: 'Invalid Email or Password' })
      break;

    default:
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' })
      break;
  }

}

module.exports = errorhandler