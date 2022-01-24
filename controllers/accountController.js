const { User } = require('../models/index')
const { verifyPass } = require('../helpers/bycrypt')
const { signToken } = require('../helpers/jwtoken')

class Controller {

  static async register(req, res,next) {
    try {
      const { email, password, username } = req.body;

      const value = {
        email: email,
        password: password,
        username: username,
      }

      const result = await User.create(value);

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
  
      if (!email) throw({name: "emailReq"})
      if (!password) throw({name: "passReq"})

      const user = await User.findOne({
        where: {
          email
        }
      })

      
      if (!user || !verifyPass(password, user.password)) {
        throw({name: 'invalidLogin'})
      }
      
      const token = signToken({
        id: user.id,
        email: user.email
      })

      res.status(200).json({access_token: token})
      
    } catch (err) {
      next(err)
    }
  }

}

module.exports = Controller