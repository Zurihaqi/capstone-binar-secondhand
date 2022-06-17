"use strict";

const { City } = require("../models");
const bcrypt = require("bcrypt");
const usersMasterData = require("../masterdata/users.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = usersMasterData.map((eachUserData) => {
      return {
        name: eachUserData.name,
        email: eachUserData.email,
        password: bcrypt.hashSync(
          eachUserData.password,
          +process.env.SALT_ROUNDS
        ),
        photo_profile: eachUserData.photo_profile,
        phone: eachUserData.phone,
        address: eachUserData.address,
        cities_id: eachUserData.city.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    const findCity = await City.findOne({
      where: { name: userData[0].cities_id },
    });

    if (findCity) {
      userData[0].cities_id = findCity.id;
    }

    await queryInterface.bulkInsert("Users", userData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
