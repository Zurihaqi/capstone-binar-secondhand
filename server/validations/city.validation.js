const { body, param } = require("express-validator");

module.exports = {
  getSpecificCity: () => [
    param("id").notEmpty().withMessage("id cannot be empty"),
  ],
};
