const { City } = require("../db/models");
const errors = require("../misc/errors");
const success = require("../misc/success");

module.exports = {
  getAllCities: async (req, res, next) => {
    console.log(City);
    try {
      //? Get semua cities
      const cities = await City.findAll();
      if (cities) {
        return success.GET_SUCCESS(res, cities);
      }
      throw errors.EMPTY_TABLE("Cities");
    } catch (error) {
      next(error);
    }
  },
  getSpecificCity: async (req, res, next) => {
    try {
      const { id } = req.params;
      const city = await City.findByPk(id);
      if (city) {
        return success.GET_SUCCESS(res, city);
      }
      //! city tidak ditemukan
      throw errors.NOT_FOUND("City", id);
    } catch (error) {
      next(error);
    }
  },
};
