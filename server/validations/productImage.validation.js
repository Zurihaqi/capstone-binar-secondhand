const { body, param } = require("express-validator");

const getProductImageById = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const createProductImage = () => [
  body("products_id")
    .isNumeric()
    .withMessage("products_id can only contain numbers"),
];

const updateProductImage = () => [
  body("products_id")
    .isNumeric()
    .withMessage("products_id can only contain numbers"),
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const deleteProductImage = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

module.exports = {
  getProductImageById,
  createProductImage,
  updateProductImage,
  deleteProductImage,
};
