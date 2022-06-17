"use strict";

const categoriesMasterData = require("../masterdata/categories.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    const categoriesData = categoriesMasterData.map((eachCategoryData) => {
      return {
        name: eachCategoryData.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Categories", categoriesData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
