const router = require("express").Router();
const controller = require("../controllers/wishlist.controller");
const validation = require("../validations/wishlist.validation");
const validate = require("../middlewares/validation");

router.get("/", controller.getAllWishlist);
router.get("/:id", validation.getById(), validate, controller.getWishlistById);
router.post("/", validation.create(), validate, controller.createWishlist);
router.patch("/:id", validation.update(), validate, controller.updateWishlist);
router.delete(
  "/:id",
  validation.deleteWishlist,
  validate,
  controller.deleteWishlist
);

module.exports = router;
