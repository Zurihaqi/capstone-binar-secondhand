const { body, param } = require('express-validator');

const getProductById = () => [
    param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
];

const createProduct = () => [
    body('name')
    .isAlphanumeric('en-US', {ignore: ' '})
    .notEmpty()
    .withMessage('Product name cannot be empty'),
    body('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Price can only contain numbers'),
    body('users_id')
    .notEmpty()
    .withMessage('users_id cannot be empty'),
    body('categories_id')
    .notEmpty()
    .withMessage('categories_id cannot be empty')
];

const updateProduct = () => [
    body('name')
    .isAlphanumeric('en-US', {ignore: ' '})
    .notEmpty()
    .withMessage('Product name cannot be empty'),
    body('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Price can only contain numbers'),
    body('users_id')
    .notEmpty()
    .withMessage('users_id cannot be empty'),
    body('categories_id')
    .notEmpty()
    .withMessage('categories_id cannot be empty'),
    param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
];

const deleteProduct = () => [
    param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
];

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};

