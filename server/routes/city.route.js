const router = require("express").Router();
const {
  getAllCities,
  getSpecificCity,
} = require("../controllers/cities.controller");
const validation = require("../validations/city.validation");
const validate = require("../middlewares/validation");

router.get("/", getAllCities);
router.get("/:id", validation.getSpecificCity(), validate, getSpecificCity);

module.exports = router;
