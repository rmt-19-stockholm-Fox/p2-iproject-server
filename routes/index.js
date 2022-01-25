const router = require('express').Router();
const controller = require('../controllers');
const auth = require('../middlewares/authentication');

router.post('/login-google', controller.loginGoogle);
router.post('/user', controller.getUserByToken);
router.post('/posts', auth, controller.createPost);
router.get('/posts', controller.getPosts);
router.delete('/posts/:id', controller.deletePost);

module.exports = router;
