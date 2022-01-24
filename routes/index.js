const router = require("express").Router();
const userRouter = require("./userRoutes");
const diariesRouter = require("./diariesRoute");
const authentication = require("../middlewares/authentication");

router.use("/", userRouter);
router.use(authentication);
router.use("/", diariesRouter);

module.exports = router;
