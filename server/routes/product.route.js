const router = require("express").Router();
const controller = require("../controllers/product.controller");
const validation = require("../validations/product.validation");
const validate = require("../middlewares/validation");
const multer = require("../middlewares/multer");
const cloudinaryUpload = require("../middlewares/cloudinary");

router.get("/", controller.getAllProducts);
router.get("/published", controller.getAllPublishedProducts);
router.get("/my-own", controller.getAllMyProducts);
router.get(
  "/:id",
  validation.getProductById(),
  validate,
  controller.getProductById
);
router.post(
  "/",
  multer.imageUpload.array("product_images", 4),
  multer.errorHandler,
  validation.createProduct(),
  validate,
  cloudinaryUpload,
  controller.createProduct
);
router.patch(
  "/:id",
  multer.imageUpload.array("product_images", 4),
  multer.errorHandler,
  validation.updateProduct(),
  validate,
  cloudinaryUpload,
  controller.updateProduct
);
router.delete(
  "/:id",
  validation.deleteProduct(),
  validate,
  controller.deleteProduct
);

module.exports = router;
