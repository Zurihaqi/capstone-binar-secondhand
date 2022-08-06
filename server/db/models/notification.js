"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Product, {
        foreignKey: "products_id",
      });
      Notification.belongsTo(models.User, {
        foreignKey: "users_id",
      });
    }
  }

  Notification.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      products_id: DataTypes.INTEGER,
      users_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );

  return Notification;
};
