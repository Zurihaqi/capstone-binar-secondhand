"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tender.belongsTo(models.User, {
        as: "buyer",
        foreignKey: "buyer_id",
      });
      Tender.belongsTo(models.User, {
        as: "seller",
        foreignKey: "seller_id",
      });
      Tender.belongsTo(models.Product, {
        foreignKey: "products_id",
      });
    }
  }
  Tender.init(
    {
      offer_status: DataTypes.STRING,
      price: DataTypes.INTEGER,
      seller_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
      products_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tender",
    }
  );
  return Tender;
};
