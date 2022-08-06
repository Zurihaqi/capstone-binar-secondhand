const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const validation = require("../validations/auth.validation");
const validate = require("../middlewares/validation");

const login = router.post(
  "/login",
  validation.login(),
  validate,
  controller.signIn
);
const register = router.post(
  "/register",
  validation.register(),
  validate,
  controller.signUp
);

module.exports = {
  login,
  register,
};
