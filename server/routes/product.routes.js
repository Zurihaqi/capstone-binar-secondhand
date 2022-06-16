const router = require('express').Router();
const { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/product.controller');
const validate = require('../middlewares/validation');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validate, createProduct);
router.patch('/:id', validate, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
