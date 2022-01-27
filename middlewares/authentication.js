const jwt = require('../helpers/jwt');
const { User } = require('../models');

module.exports = async function(req, res, next) {
  try {
    const { access_token } = req.headers;
    const { id } = await jwt.verify(access_token);
    const user = await User.findByPk(id);
  
    if (!user) {
      throw { name: 'Unauthorized' };
    }
  
    req.user = { id };

    next();
  } catch(err) {
    next(err);
  }
}
