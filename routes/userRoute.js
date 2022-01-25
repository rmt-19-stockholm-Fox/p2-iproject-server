const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register/participant", userController.registerParticipant);
router.post("/register/customer", userController.registerCustomer);
router.post("/login", userController.login);

module.exports = router;
