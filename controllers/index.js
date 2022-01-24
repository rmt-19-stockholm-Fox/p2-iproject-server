const { User, Post } = require('../models');
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

  async createPost(req, res, next) {
    try {
      const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id
      });

      res.json({
        id: post.id,
        createdAt: post.createdAt
      });
    } catch(err) {
      next(err);
    }
  },

  async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']]
      });

      res.json(posts);
    } catch(err) {
      next(err);
    }
  }
}
