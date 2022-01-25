const { User, Backdrop, Scene } = require(`../models`);

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const batch = {
        email,
        password,
      };
      await User.create(batch);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
