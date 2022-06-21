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
        foreignKey: "users_id",
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
      users_id: DataTypes.INTEGER,
      products_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tender",
      tableName: "tenders",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Tender;
};
