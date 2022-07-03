const { body } = require("express-validator");

module.exports = {
  login: () => [
    body("email")
      .notEmpty()
      .withMessage("Enter an email")
      .normalizeEmail()
      .isEmail(),
    body("password").notEmpty().withMessage("Enter a password"),
  ],
  register: () => [
    body("name")
      //alphabetic = string tanpa angka dan simbol, ignore: " " = memperbolehkan spasi
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Name cannot contain number or symbols")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").normalizeEmail().isEmail().withMessage("Enter a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Enter a password")
      .isLength({ min: 6 })
      .withMessage("Require 6 characters"),
  ],
};
