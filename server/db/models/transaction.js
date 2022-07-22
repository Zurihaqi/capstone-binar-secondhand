"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "buyer_id",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: "seller_id",
      });
      Transaction.belongsTo(models.Tender, {
        foreignKey: "tender_id",
      });
    }
  }

  Transaction.init(
    {
      payment_status: DataTypes.STRING,
      invoice_code: DataTypes.STRING,
      price: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
      seller_id: DataTypes.INTEGER,
      tender_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );

  return Transaction;
};
