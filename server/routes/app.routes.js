const router = require("express").Router();
const { login, register } = require("./auth.route");
const authentication = require("../middlewares/passport");
const productRoutes = require("./product.route");
const categoryRoutes = require("./category.route");
const cityRoutes = require("./city.route");
const tenderRoutes = require("./tender.route");
const userRoutes = require("./user.route");
const wishlistRoutes = require("./wishlist.route");
const notificationsRoutes = require("./notification.route");
const transactionRoutes = require("./transaction.route");
const productHome = require("./productHome.route");

const errorRoutes = require("./error.route");

router.use(register);
router.use(login);
router.use("/home", productHome);

//! authentication yang bener
router.use(authentication);

router.use("/products", productRoutes);
router.use("/cities", cityRoutes);
router.use("/tenders", tenderRoutes);
router.use("/profile", userRoutes);
router.use("/category", categoryRoutes);
router.use("/wishlists", wishlistRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/transactions", transactionRoutes);

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
