const { City } = require("../db/models");
const errors = require("../misc/errors");

module.exports = {
  getAllCities: async (req, res, next) => {
    console.log(City);
    try {
      //? Get semua cities
      const cities = await City.findAll();
      if (cities) {
        return res.status(200).json({
          status: "Success",
          data: cities,
        });
      }
      throw {
        code: 404,
        status: "Not Found",
        message: "Cities is Empty",
      };
    } catch (error) {
      next(error);
    }
  },
  getSpecificCity: async (req, res, next) => {
    try {
      const { id } = req.params;
      const city = await City.findByPk(id);
      if (city) {
        return res.status(200).json({
          status: "Success",
          data: city,
        });
      }
      //! city tidak ditemukan
      throw errors.NOT_FOUND("City", id);
    } catch (error) {
      next(error);
    }
  },
};
