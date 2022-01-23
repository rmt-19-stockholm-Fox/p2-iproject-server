const { User } = require('../models');
const gAuth = require('../helpers/google-auth');
const uuid = require('../helpers/uuid');
const jwt = require('../helpers/jwt');

module.exports = {
  async loginGoogle(req, res, next) {
    try {
      const googleUser = await gAuth.verify(req.body.token);
      const [ user ] = await User.findOrCreate({
        where: { email: googleUser.email },
        defaults: { password: uuid.random() }
      });
  
      const token = await jwt.sign({ id: user.id });
  
      res.json({
        access_token: token,
        user: { email: googleUser.email }
      });
    } catch(err) {
      next(err);
    }
  },

  async verifyToken(req, res, next) {
    try {
      const payload = await jwt.verify(req.body.access_token);
      const user = await User.findByPk(payload.id, {
        attributes: ['email']
      });

      res.json(user);
    } catch(err) {
      next(err);
    }
  }
}
