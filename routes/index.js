const router = require('express').Router();
const controller = require('../controllers');

router.post('/login-google', controller.loginGoogle);
router.post('/token-verification', controller.verifyToken);

module.exports = router;
