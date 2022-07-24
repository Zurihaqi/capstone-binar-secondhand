const { body, param } = require("express-validator");

module.exports = {
  getById: () => [param("id").notEmpty().withMessage("Id cannot be empty")],
  create: () => [
    body("tender_id")
      .isNumeric()
      .withMessage("products_id can only contain numbers")
      .notEmpty()
      .withMessage("products_id cannot be empty"),
  ],
  update: () => [
    param("id").notEmpty().withMessage("Id cannot be empty"),
    body("tender_id")
      .notEmpty()
      .withMessage("tender_id cannot be empty")
      .isNumeric()
      .withMessage("tender_id can only contain numbers"),
  ],
  delete: () => [param("id").notEmpty().withMessage("Id cannot be empty")],
};
