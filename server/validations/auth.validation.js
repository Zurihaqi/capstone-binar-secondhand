const { body } = require("express-validator");

module.exports = {
  register: () => [
    body("name")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Enter a valid name"),
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Enter a password"),
  ],
};
