const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const { adminController } = require('../controllers/adminControllers')
const { customerController } = require('../controllers/customerControllers')
const { controller } = require('../controllers/controllers')
const { authenticationAdmin, authenticationCustomer } = require('../middlewares/authentication')

router.post('/register', controller.register)
router.post('/login', controller.login)

router.use(authorization)
router.post('/travel', authenticationAdmin, adminController.postTravel)
router.get('/travel', controller.getTravelPosts)
router.get('/travel/:id', controller.getTravelPostsById)
router.post('/events/:travelPostId', authenticationAdmin, adminController.postEvents)
router.get('/events/:travelPostId', authenticationAdmin, adminController.getEvents)

router.post('/bookings/:postId', authenticationCustomer, customerController.postBooking)
router.get('/bookings', authenticationCustomer, customerController.getBooking)
router.post('/midtrans', authenticationCustomer, customerController.midtrans)

module.exports = router