const router = require("express").Router();
const controller = require("../controllers/productImage.controller");
const validation = require("../validations/productImage.validation");
const validate = require("../middlewares/validation");
const multer = require("../middlewares/multer");
const cloudinaryUpload = require("../middlewares/cloudinary");

router.get("/", controller.getAllProductImage);
router.get(
  "/:id",
  validation.getProductImageById(),
  validate,
  controller.getProductImageById
);
router.post(
  "/",
  validation.createProductImage(),
  validate,
  multer.imageUpload.single("product_image"),
  multer.fileSizeLimitErrorHandler,
  cloudinaryUpload,
  controller.createProductImage
);
router.patch(
  "/:id",
  validation.updateProductImage(),
  validate,
  multer.imageUpload.single("product_image"),
  multer.fileSizeLimitErrorHandler,
  cloudinaryUpload,
  controller.updateProductImage
);
router.delete(
  "/:id",
  validation.deleteProductImage(),
  validate,
  controller.deleteProductImage
);

module.exports = router;
