"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.City, {
        foreignKey: "cities_id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo_profile: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      cities_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(
            user.password.toString(),
            +process.env.SALT_ROUNDS
          );
          return user;
        },
      },
    }
  );

  return User;
};
