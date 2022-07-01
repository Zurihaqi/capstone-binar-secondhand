const router = require("express").Router();
const validation = require("../validations/user.validation");
const validate = require("../middlewares/validation");
const {
  getUserById,
  updateUser,
  deleteUserById,
} = require("../controllers/users.controller");

router.get("/:id", validation.getUserById, validate, getUserById);
router.patch("/:id", validation.updateUser, validate, updateUser);
router.delete("/:id", validation.deleteUser, validate, deleteUserById);

module.exports = router;
