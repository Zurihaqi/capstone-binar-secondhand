const express = require('express');
const path = require("path");
const logger = require("morgan");

// call all module route here
const authRouter = require("./app/api/auth/router");

require("dotenv").config();
const express = require("express");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(authRouter);
app.use("/", (req, res) => {
    res.json({
        message: "Selamat Datang di API SecondHand"
    })
})


module.exports = app;
