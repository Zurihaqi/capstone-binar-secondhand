const { body, param } = require("express-validator");

const getProductImageById = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const createProductImage = () => [
  body("products_id").notEmpty().withMessage("products_id cannot be empty"),
];

const updateProductImage = () => [
  body("products_id").notEmpty().withMessage("products_id cannot be empty"),
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
