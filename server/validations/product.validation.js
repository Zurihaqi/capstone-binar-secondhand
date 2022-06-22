const { body, param } = require("express-validator");

const getProductById = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const createProduct = () => [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long"),
  body("price").isNumeric().withMessage("Price can only contain numbers"),
  body("description").notEmpty().withMessage("description cannot be empty"),
  body("users_id").notEmpty().withMessage("users_id cannot be empty"),
  body("categories_id").notEmpty().withMessage("categories_id cannot be empty"),
];

const updateProduct = () => [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long"),
  body("price").isNumeric().withMessage("Price can only contain numbers"),
  body("users_id").isNumeric().withMessage("users_id can only contain numbers"),
  body("categories_id")
    .isNumeric()
    .withMessage("categories_id can only contain numbers"),
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const deleteProduct = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
