const router = require('express').Router();
const productRoutes = require('./product.route');
const productImageRoutes = require('./productImage.route');

router.use('/products', productRoutes);
router.use('/product-image', productImageRoutes);

//page not found handler, selalu tempatkan di paling bawah
router.use((req, res) => {
    return res.status(404).json({
        status: 'Not Found',
        message: 'Page not found'
    });
});

module.exports = router;