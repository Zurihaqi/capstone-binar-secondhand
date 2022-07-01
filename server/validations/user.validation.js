const { body, param } = require("express-validator");

module.exports = {
  getUserById: () => [
    param("id").notEmpty().withMessage("id user cannot empty"),
  ],
  updateUser: () => [
    param("id").notEmpty().withMessage("id user cannot empty"),
    body("name").isString().withMessage("Name is String"),
    body("phone")
      .isString()
      .notEmpty()
      .withMessage("Phone Number cannot empty"),
    body("address").isString().withMessage("Address is String"),
    body("cities_id").isInt().withMessage("cities_id is Integer"),
  ],
  deleteUser: () => [
    param("id").notEmpty().withMessage("id user cannot empty"),
  ],
};
