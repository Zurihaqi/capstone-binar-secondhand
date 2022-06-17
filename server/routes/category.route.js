const router = require("express").Router();
const controller = require("../controllers/category.controller");
const validation = require("../validations/category.validation");
const validate = require("../middlewares/validation");

router.get("/", controller.getAllCategory);
router.get(
  "/:id",
  validation.getCategoryById(),
  validate,
  controller.getCategoryById
);
router.post(
  "/",
  validation.createCategory(),
  validate,
  controller.createCategory
);
router.patch(
  "/:id",
  validation.updateCategory(),
  validate,
  controller.updateCategory
);
router.delete(
  "/:id",
  validation.deleteCategory(),
  validate,
  controller.deleteCategory
);

module.exports = router;
