const { body, param } = require("express-validator");

module.exports = {
  getTenderById: () => [param("id").notEmpty().withMessage("id cannot empty")],
  createTender: () => [
    body("price")
      .isNumeric()
      .notEmpty()
      .withMessage("Price can only contain numbers"),
    // body("buyer_id").notEmpty().withMessage("buyer_id cannot be empty"),
    // body("seller_id").notEmpty().withMessage("seller_id cannot be empty"),
    body("products_id").notEmpty().withMessage("products_id cannot be empty"),
  ],
  updateTender: () => [
    param("id").notEmpty().withMessage("id cannot empty"),
    body("price")
      .optional()
      .isNumeric()
      .notEmpty()
      .withMessage("Price can only contain numbers"),
  ],
  deleteTender: () => [
    param("id").notEmpty().withMessage("id cannot be empty"),
  ],
};
