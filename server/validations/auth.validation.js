const { body } = require("express-validator");

module.exports = {
  login: () => [
    body("email").notEmpty().withMessage("Enter an email"),
    body("password").notEmpty().withMessage("Enter a password"),
  ],
  register: () => [
    body("name")
      .isAlpha("en-US", { ignore: " " })
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .withMessage("Enter a valid name"),
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Enter a password"),
  ],
};
