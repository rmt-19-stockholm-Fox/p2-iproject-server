const express = require('express');
const router = express.Router();
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const categoryRoute = require('./categoryRoute');
const bookmarkRoute = require('./bookmarkRoute');

router.use('/user', userRoute);
router.use('/categories', categoryRoute);
router.use('/bookmark', bookmarkRoute);
router.use('/', productRoute);
router.use((err, req, res, next) => {
    const code = err.code || 500;
    const message = err.message || 'Internal server error';

    res.status(code).json({code, message});
})

module.exports = router;