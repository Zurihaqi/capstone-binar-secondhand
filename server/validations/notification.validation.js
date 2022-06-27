const { body, param } = require("express-validator");

const getById = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const create = () => [
  body("title").notEmpty().withMessage("title cannot be empty"),
  body("description").notEmpty().withMessage("description cannot be empty"),
  body("users_id").notEmpty().withMessage("users_id cannot be empty"),
  body("products_id").notEmpty().withMessage("products_id cannot be empty"),
];

const update = () => [
  body("users_id").notEmpty().withMessage("users_id cannot be empty"),
  body("products_id").notEmpty().withMessage("products_id cannot be empty"),
  param("id").notEmpty().withMessage("id cannot be empty"),
];

const deleteNotification = () => [
  param("id").notEmpty().withMessage("id cannot be empty"),
];

module.exports = {
  getById,
  create,
  update,
  deleteNotification,
};
