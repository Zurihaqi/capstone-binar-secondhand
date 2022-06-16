'use strict';

const citiesMasterdata = require('../masterdata/cities.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const cityData = citiesMasterdata.map((eachCityData) => {
      return{
        "name": eachCityData.name,
        "created_at": new Date().toLocaleString('en-GB', {timezone: 'UTC+7'}),
        "updated_at": new Date().toLocaleString('en-GB', {timezone: 'UTC+7'})
      };
    });
    const sortByCityName = cityData.sort((a, b) => a.name > b.name ? 1 : -1);
    await queryInterface.bulkInsert('cities', sortByCityName);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
