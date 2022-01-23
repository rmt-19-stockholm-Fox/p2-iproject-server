const router = require('express').Router();
const controller = require('../controllers');

router.post('/login-google', controller.loginGoogle);
router.post('/user', controller.getUserByToken);

module.exports = router;
