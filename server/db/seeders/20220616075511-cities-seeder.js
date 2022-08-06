"use strict";

const citiesMasterdata = require("../masterdata/cities.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    const cityData = citiesMasterdata.map((eachCityData) => {
      return {
        name: eachCityData.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    const sortByCityName = cityData.sort((a, b) => (a.name > b.name ? 1 : -1));
    await queryInterface.bulkInsert("Cities", sortByCityName);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
