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
  // body("users_id").notEmpty().withMessage("users_id cannot be empty"),
  body("product_images")
    .notEmpty()
    .withMessage("product_images cannot be empty"),
  body("categories_id").notEmpty().withMessage("categories_id cannot be empty"),
];

//tambahkan .optional() untuk endpoint update agar bisa mengupdate field tertentu
const updateProduct = () => [
  // body("users_id")
  //   .optional()
  //   .isNumeric()
  //   .withMessage("users_id can only contain numbers"),
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price can only contain numbers"),
  body("description")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long"),
  body("product_images")
    .optional()
    .notEmpty()
    .withMessage("product_images cannot be empty"),
  body("categories_id")
    .optional()
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
