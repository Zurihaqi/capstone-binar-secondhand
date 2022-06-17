const { body, param } = require("express-validator");

const getCategoryById = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const createCategory = () => [
  body("name").notEmpty().withMessage("Category name cannot be empty"),
];

const updateCategory = () => [
  body("name")
    .isAlphanumeric("en-US", { ignore: " " })
    .notEmpty()
    .withMessage("Category name cannot be empty"),
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const deleteCategory = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
