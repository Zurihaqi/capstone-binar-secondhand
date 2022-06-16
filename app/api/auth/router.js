const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/api/auth/login", controller.signIn);

module.exports = router;