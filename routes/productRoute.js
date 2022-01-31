const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});
const imageKit = require("../middlewares/imagekit");
const {
  authentication,
  addProductAuthorization,
  editDeleteProductAuthorization,
} = require("../middlewares/auth");
const productController = require("../controllers/productController");

router.get("/", productController.findAll);
router.get("/:id", productController.findSelected);
router.use(authentication);
router.get("/seller/myProduct", productController.findAllMyProduct);
router.post(
  "/",
  upload.array("ProductImage", 3),
  imageKit,
  addProductAuthorization,
  productController.addProduct
);
router.use("/:id", editDeleteProductAuthorization);
router.delete("/:id", productController.deleteProduct);
router.put(
  "/:id",
  upload.array("ProductImage", 3),
  imageKit,
  productController.editProduct
);

module.exports = router;
