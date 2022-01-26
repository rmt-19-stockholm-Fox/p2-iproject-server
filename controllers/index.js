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
        defaults: {
          name: `${googleUser.given_name} ${googleUser.family_name}`,
          password: uuid.random(),
          pictureUrl: googleUser.picture
        }
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

  async getUserByToken(req, res, next) {
    try {
      const payload = await jwt.verify(req.headers.access_token);
      const user = await User.findByPk(payload.id, {
        attributes: ['name', 'email', 'pictureUrl']
      });

      res.json(user);
    } catch(err) {
      next(err);
    }
  },
  
  ...require('./post'),
  ...require('./place')
}
