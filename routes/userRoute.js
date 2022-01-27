const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register/seller", userController.registerSeller);
router.post("/register/customer", userController.registerCustomer);
router.post("/login", userController.login);

module.exports = router;
