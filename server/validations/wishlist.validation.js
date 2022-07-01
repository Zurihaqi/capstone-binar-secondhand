const { body, param } = require("express-validator");

const getById = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const create = () => [
  body("users_id").isNumeric().withMessage("users_id can only contain numbers"),
  body("products_id")
    .isNumeric()
    .withMessage("products_id can only contain numbers"),
];

const update = () => [
  body("users_id")
    .optional()
    .isNumeric()
    .withMessage("users_id can only contain numbers"),
  body("products_id")
    .optional()
    .isNumeric()
    .withMessage("products_id can only contain numbers"),
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const deleteWishlist = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

module.exports = {
  getById,
  create,
  update,
  deleteWishlist,
};
