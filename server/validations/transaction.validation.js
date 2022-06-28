const { body, param } = require("express-validator");

module.exports = {
  getById: () => [param("id").notEmpty().withMessage("Id cannot be empty")],
  create: () => [
    body("payment_status")
      .notEmpty()
      .withMessage("payment_status cannot be empty"),
    body("invoice_code").notEmpty().withMessage("invoice_code cannot be empty"),
    body("price").isNumeric().withMessage("price can only contain numbers"),
    body("buyer_id")
      .isNumeric()
      .withMessage("buyer_id can only contain numbers")
      .notEmpty()
      .withMessage("buyer_id cannot be empty"),
    body("seller_id")
      .isNumeric()
      .withMessage("seller_id can only contain numbers")
      .notEmpty()
      .withMessage("seller_id cannot be empty"),
    body("products_id")
      .isNumeric()
      .withMessage("products_id can only contain numbers")
      .notEmpty()
      .withMessage("products_id cannot be empty"),
  ],
  update: () => [
    param("id").notEmpty().withMessage("Id cannot be empty"),
    body("price")
      .optional()
      .isNumeric()
      .withMessage("price can only contain numbers"),
    body("buyer_id")
      .optional()
      .isNumeric()
      .withMessage("buyer_id can only contain numbers")
      .notEmpty()
      .withMessage("buyer_id cannot be empty"),
    body("seller_id")
      .optional()
      .isNumeric()
      .withMessage("seller_id can only contain numbers")
      .notEmpty()
      .withMessage("seller_id cannot be empty"),
    body("products_id")
      .optional()
      .isNumeric()
      .withMessage("products_id can only contain numbers")
      .notEmpty()
      .withMessage("products_id cannot be empty"),
  ],
  delete: () => [param("id").notEmpty().withMessage("Id cannot be empty")],
};
