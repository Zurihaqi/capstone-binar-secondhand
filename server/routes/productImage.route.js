const router = require('express').Router();
const controller = require('../controllers/productImage.controller');
const validation = require('../validations/productImage.validation');
const validate = require('../middlewares/validation');

router.get('/', controller.getAllProductImage);
router.get('/:id', validation.getProductImageById(), validate, controller.getProductImageById);
router.post('/', validation.createProductImage(), validate, controller.createProductImage);
router.patch('/:id', validation.updateProductImage(), validate, controller.updateProductImage);
router.delete('/:id', validation.deleteProductImage(), validate, controller.deleteProductImage);

module.exports = router;