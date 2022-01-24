const bcrypt = require('bcryptjs')

const hassPass = (pass) => {
  return bcrypt.hashSync(pass, 10)
};

const verifyPass = (pass, hash) => {
  return bcrypt.compareSync(pass, hash)
};

module.exports = {
  hassPass,
  verifyPass
};