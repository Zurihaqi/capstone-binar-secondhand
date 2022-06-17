require('dotenv').config();
const express = require('express');
const app = express();
const router = require("./server/routes/app.routes");
const logger = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('combined'));

app.use('/api', router);

module.exports = app;
