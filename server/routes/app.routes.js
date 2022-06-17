const router = require("express").Router();
const productRoutes = require("./product.route");
const productImageRoutes = require("./productImage.route");
const categoryRoutes = require("./category.route");
const authRoutes = require("./auth.route");

router.use("/login", authRoutes);
router.use("/products", productRoutes);
router.use("/product-images", productImageRoutes);
router.use("/category", categoryRoutes);

//page not found handler, selalu tempatkan di paling bawah
router.use((req, res) => {
  return res.status(404).json({
    status: "Not Found",
    message: "Page not found",
  });
});

module.exports = router;
