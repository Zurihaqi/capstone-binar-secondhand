const { body, param } = require("express-validator");

module.exports = {
  getTenderById: () => [param("id").notEmpty().withMessage("id cannot empty")],
  createTender: () => [
    body("offer_status")
      .isAlphanumeric("en-US", { ignore: " " })
      .notEmpty()
      .withMessage("Tender offer status cannot be empty"),
    body("price")
      .isNumeric()
      .notEmpty()
      .withMessage("Price can only contain numbers"),
    body("users_id").notEmpty().withMessage("users_id cannot be empty"),
    body("products_id").notEmpty().withMessage("products_id cannot be empty"),
  ],
  updateTender: () => [
    param("id").notEmpty().withMessage("id cannot empty"),
    body("offer_status")
      .isAlphanumeric("en-US", { ignore: " " })
      .notEmpty()
      .withMessage("Tender offer status cannot be empty"),
    body("price")
      .isNumeric()
      .notEmpty()
      .withMessage("Price can only contain numbers"),
    body("users_id").notEmpty().withMessage("users_id cannot be empty"),
    body("products_id").notEmpty().withMessage("products_id cannot be empty"),
  ],
  deleteTender: () => [
    param("id").notEmpty().withMessage("id cannot be empty"),
  ],
};
