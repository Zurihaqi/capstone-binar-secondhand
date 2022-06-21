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
  multer.imageUpload.array("image_url", 4),
  multer.fileSizeLimitErrorHandler,
  validation.createProductImage(),
  validate,
  cloudinaryUpload,
  controller.createProductImage
);
router.patch(
  "/:id",
  multer.imageUpload.array("image_url", 4),
  multer.fileSizeLimitErrorHandler,
  validation.updateProductImage(),
  validate,
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
