const router = require("express").Router();
const productRoutes = require("./product.route");
const productImageRoutes = require("./productImage.route");
const categoryRoutes = require("./category.route");
const authRoutes = require("./auth.route");
const cityRoutes = require("./city.route");
const wishlistRoutes = require("./wishlist.route");

const errorRoutes = require("./error.route");

router.use("/login", authRoutes);
router.use("/products", productRoutes);
router.use("/product-images", productImageRoutes);
router.use("/cities", cityRoutes);
router.use("/category", categoryRoutes);
router.use("/wishlists", wishlistRoutes);

//error handlers
router.use((error, req, res, next) => errorRoutes(error, req, res, next));

//page not found handler, selalu tempatkan di paling bawah
router.use((req, res) => {
  return res.status(404).json({
    status: "Not found",
    message: "Page not found",
  });
});

module.exports = router;
