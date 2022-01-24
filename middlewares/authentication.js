const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    req.currentUser = {
      id: user.id,
      username: user.username,
    };
    if (access_token && user) {
      next();
    } else {
      throw { name: "InvalidAccess" };
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = authentication;
