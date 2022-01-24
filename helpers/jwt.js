const jwt = require("jsonwebtoken");
const SECRET_KEY = "something234";

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { createToken, verifyToken };
