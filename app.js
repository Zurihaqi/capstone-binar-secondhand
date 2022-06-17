require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");

// call all module route here
const router = require("./server/routes/app.routes");
const authRouter = require("./app/api/auth/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("combined"));

app.use("/", (req, res) => {
  res.json({
    message: "Selamat Datang di API SecondHand",
  });
});

app.use("/api", router);
app.use(authRouter);

module.exports = app;
