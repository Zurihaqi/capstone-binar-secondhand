require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const bcrypt = require("bcrypt");
const { sequelize } = require("../server/db/models/index");
