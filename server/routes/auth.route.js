const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/", controller.signin);
router.post("/", controller.signup);
module.exports = router;
