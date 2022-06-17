const { body, param } = require('express-validator');

const getProductImageById = () => [
    param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
];

const createProductImage = () => [
    body('image_url')
    .notEmpty()
    .withMessage('product image cannot be empty'),
    body('products_id')
    .notEmpty()
    .withMessage('products_id cannot be empty')
];

const updateProductImage = () => [
    body('image_url')
    .notEmpty()
    .withMessage('product image cannot be empty'),
    body('products_id')
    .notEmpty()
    .withMessage('products_id cannot be empty'),
    param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
];

const deleteProductImage = () => [
    param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
];

module.exports = {
    getProductImageById,
    createProductImage,
    updateProductImage,
    deleteProductImage
};