const router = require('express').Router();
const controller = require('../controllers/product.controller');
const validation = require('../validations/product.validation');
const validate = require('../middlewares/validation');

router.get('/', controller.getAllProducts);
router.get('/:id', validation.getProductById(), validate, controller.getProductById);
router.post('/', validation.createProduct(), validate, controller.createProduct);
router.patch('/:id', validation.updateProduct(), validate, controller.updateProduct);
router.delete('/:id', validation.deleteProduct(), validate, controller.deleteProduct);

module.exports = router;