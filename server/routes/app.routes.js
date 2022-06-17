const router = require("express").Router();
const productRoutes = require("./product.route");
const productImageRoutes = require("./productImage.route");
const authRoutes = require("./auth.route");
const cityRoutes = require("./city.route");

router.use("/login", authRoutes);
router.use("/products", productRoutes);
router.use("/product-images", productImageRoutes);
router.use("/cities", cityRoutes);

//page not found handler, selalu tempatkan di paling bawah
router.use((req, res) => {
  return res.status(404).json({
    status: "Not Found",
    message: "Page not found",
  });
});

module.exports = router;
