const bcrypt = require('bcrypt');

const SALT_ROUNDS = 8;

module.exports = {
  hash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
  },
  compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
};
