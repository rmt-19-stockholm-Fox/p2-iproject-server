const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

module.exports = {
  sign(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        SECRET,
        (err, token) => {
          if (err) reject(err)
          else resolve(token);
        }
      );
    });
  },
  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        SECRET,
        (err, payload) => {
          if (err) reject(err)
          else resolve(payload);
        }
      );
    });
  }
}
