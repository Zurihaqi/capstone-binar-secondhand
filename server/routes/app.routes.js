const router = require("express").Router();
const productRoutes = require("./product.route");
const productImageRoutes = require("./productImage.route");
const categoryRoutes = require("./category.route");
const authRoutes = require("./auth.route");
const cityRoutes = require("./city.route");
const tenderRoutes = require("./tender.route");
const wishlistRoutes = require("./wishlist.route");

router.use("/login", authRoutes);
router.use("/products", productRoutes);
router.use("/product-images", productImageRoutes);
router.use("/cities", cityRoutes);
router.use("/tenders", tenderRoutes);
router.use("/category", categoryRoutes);
router.use("/wishlists", wishlistRoutes);

//error handlers
router.use((error, req, res, next) => {
  if (error.code) {
    return res.status(error.code).json({
      status: error.status,
      message: error.message,
    });
  } else if (
    error.message === "Cannot read properties of undefined (reading 'mimetype')"
  ) {
    return res.status(400).json({
      status: "Error",
      message: "Image cannot be empty",
    });
  }
  return res.status(500).json({
    status: "Internal server error",
    message: error.message,
  });
});

//page not found handler, selalu tempatkan di paling bawah
router.use((req, res) => {
  return res.status(404).json({
    status: "Not found",
    message: "Page not found",
  });
});

module.exports = router;
