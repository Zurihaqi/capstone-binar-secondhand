const { Transaction, User, Product } = require("../db/models");
const errors = require("../misc/errors");
const successMsg = require("../misc/success");

const options = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
  include: [
    {
      model: User,
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    },
    {
      model: Product,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  ],
};

const getAllTransaction = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    let queries = [];
    for (const [key, value] of Object.entries(req.query)) {
      queries.push({ [key]: value });
    }

    //pagination, row = limit, skip = offset
    if (skip ? (options.offset = +skip - 1) : delete options.offset);
    if (row ? (options.limit = +row) : delete options.limit);

    //filtering by query
    if (
      !skip && !row
        ? (options.where = { [Op.and]: queries })
        : delete options.where
    );

    const allTransaction = await Transaction.findAll(options);

    if (allTransaction.length[0] == null) {
      throw errors.EMPTY_TABLE("Transaction");
    }
    return successMsg.GET_SUCCESS(res, data);
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const foundTransaction = await Transaction.findByPk(req.params.id, options);
    if (foundTransaction) return successMsg.GET_SUCCESS(res, foundTransaction);
    throw errors.NOT_FOUND("Transaction", req.params.id);
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const {
      payment_status,
      invoice_code,
      price,
      buyer_id,
      seller_id,
      products_id,
    } = req.body;

    const checkIfBuyerExist = await User.findByPk(buyer_id);
    if (!checkIfBuyerExist) throw errors.NOT_FOUND("User Buyer", buyer_id);

    const checkIfSellerExist = await User.findByPk(seller_id);
    if (!checkIfSellerExist) throw errors.NOT_FOUND("User Seller", seller_id);

    const checkIfProductExist = await Product.findByPk(products_id);
    if (!checkIfProductExist) throw errors.NOT_FOUND("Product", products_id);

    const transactionCreated = await Transaction.create({
      payment_status: payment_status,
      invoice_code: invoice_code,
      price: price,
      buyer_id: buyer_id,
      seller_id: seller_id,
      products_id: products_id,
    });

    if (transactionCreated)
      return successMsg.CREATE_SUCCESS(res, "Transaction", transactionCreated);
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const {
      payment_status,
      invoice_code,
      price,
      buyer_id,
      seller_id,
      products_id,
    } = req.body;

    if (buyer_id) {
      const checkIfBuyerExist = await User.findByPk(buyer_id);
      if (!checkIfBuyerExist) throw errors.NOT_FOUND("User Buyer", buyer_id);
    }
    if (seller_id) {
      const checkIfSellerExist = await User.findByPk(seller_id);
      if (!checkIfSellerExist) throw errors.NOT_FOUND("User Seller", seller_id);
    }
    if (products_id) {
      const checkIfProductExist = await Product.findByPk(products_id);
      if (!checkIfProductExist) throw errors.NOT_FOUND("Product", products_id);
    }

    const transactionUpdated = await Transaction.update(
      {
        payment_status: payment_status,
        invoice_code: invoice_code,
        price: price,
        buyer_id: buyer_id,
        seller_id: seller_id,
        products_id: products_id,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    if (transactionUpdated)
      return successMsg.UPDATE_SUCCESS(
        res,
        "Transaction",
        req.params.id,
        transactionUpdated
      );
    throw errors.NOT_FOUND("Transaction", req.params.id);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const transactionDeleted = await Transaction.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (transactionDeleted)
      return successMsg.DELETE_SUCCESS(res, "Transaction", req.params.id);
    throw errors.NOT_FOUND("Transaction", req.params.id);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransaction,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
