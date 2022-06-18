const { City } = require("../db/models");

module.exports = {
  getAllCities: async (req, res) => {
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
      //! error dengan status code
      if (error.code) {
        return res.status(error.code).json({
          status: error.status,
          message: error.message,
        });
      }
      //! error dari request
      return res.status(500).json({
        status: "Internal server error",
        message: error.message,
      });
    }
  },
  getSpecificCity: async (req, res) => {
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
      throw {
        code: 404,
        status: "Not Found",
        message: `City with id ${req.params.id} Not Found`,
      };
    } catch (error) {
      //! error dengan status code
      if (error.code) {
        return res.status(error.code).json({
          status: error.status,
          message: error.message,
        });
      }
      //! error dari request
      return res.status(500).json({
        status: "Internal server error",
        message: error.message,
      });
    }
  },
};
