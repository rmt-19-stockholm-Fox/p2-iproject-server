const router = require('express').Router();
const controller = require('../controllers');
const auth = require('../middlewares/authentication');
const uploader = require('../middlewares/images-uploader');

router.post('/login-google', controller.loginGoogle);
router.get('/users/:id', controller.getUserById);
router.post('/user', controller.getUserByToken);
router.post('/posts', auth, uploader, controller.createPost);
router.get('/posts', controller.getPosts);
router.delete('/posts/:id', auth, controller.deletePost);
router.get('/places/photo', controller.getPhoto);
router.get('/places/:id', controller.getPlaceDetail);
router.get('/places', auth, controller.searchPlaces);

module.exports = router;
