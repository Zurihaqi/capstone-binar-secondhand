const router = require("express").Router();
const controller = require("../controllers/product.controller");

router.get("/", controller.getAllProducts);

module.exports = router;
