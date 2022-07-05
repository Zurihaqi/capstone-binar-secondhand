const router = require("express").Router();
const validation = require("../validations/user.validation");
const validate = require("../middlewares/validation");
const multer = require("../middlewares/multer");
const cloudinaryUpload = require("../middlewares/cloudinary");
const {
  getUserById,
  updateUser,
  deleteUserById,
} = require("../controllers/users.controller");

router.get("/", getUserById);
router.patch(
  "/",
  multer.imageUpload.single("photo_profile"),
  multer.errorHandler,
  cloudinaryUpload,
  updateUser
);
router.delete("/", validation.deleteUser(), validate, deleteUserById);

module.exports = router;
