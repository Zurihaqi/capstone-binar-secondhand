const { City } = require("../db/models");
const errors = require("../misc/errors");
const success = require("../misc/success");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const options = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

module.exports = {
  getAllCities: async (req, res, next) => {
    try {
      //? Get semua cities
      let { skip, row } = req.query;

      if (skip) options.offset = +skip - 1;
      if (row) options.limit = +row;

      let cities;
      if (req.query.name) {
        console.log(req.query.name);
        cities = await City.findAll({
          ...options,
          where: { name: { [Op.like]: `%${req.query.name}%` } },
        });
        if (cities) {
          return success.GET_SUCCESS(res, cities);
        }
      } else {
        cities = await City.findAll(options);
        if (cities) {
          return success.GET_SUCCESS(res, cities);
        }
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
