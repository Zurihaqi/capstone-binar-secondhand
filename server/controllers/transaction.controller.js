const {
  Transaction,
  User,
  Product,
  Notification,
  Tender,
} = require("../db/models");
const generated_invoice_code = require("../helper/generateInvoiceCode");
const Op = require("sequelize").Op;
const errors = require("../misc/errors");
const successMsg = require("../misc/success");

const options = {
  include: [
    {
      model: User,
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    },
    {
      model: Tender,
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
      if (key != "skip" && key != "row") queries.push({ [key]: value });
    }

    if (skip ? (options.offset = +skip - 1) : delete options.offset);
    if (row ? (options.limit = +row) : delete options.limit);

    //filtering by query
    let params;
    if (queries[0]) {
      params = Object.keys(queries[0]);
    }
    if (
      queries[0]
        ? (options.where = {
            [params]: { [Op.iLike]: `%${Object.values(queries[0])}%` },
          })
        : delete options.where
    );

    const allTransaction = await Transaction.findAll(options);

    if (allTransaction[0] == null) {
      throw errors.EMPTY_TABLE("Transaction");
    }
    return successMsg.GET_SUCCESS(res, allTransaction);
  } catch (error) {
    next(error);
  }
};
const getAllTransactionAsSeller = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    if (skip ? (options.offset = +skip - 1) : delete options.offset);
    if (row ? (options.limit = +row) : delete options.limit);

    console.log(req.user.id);

    options.where = {
      seller_id: req.user.id,
    };

    const allTransaction = await Transaction.findAll(options);

    if (allTransaction[0] == null) {
      throw errors.EMPTY_TABLE("Seller transaction");
    }
    return successMsg.GET_SUCCESS(res, allTransaction);
  } catch (error) {
    next(error);
  }
};
const getAllTransactionAsBuyer = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    if (skip ? (options.offset = +skip - 1) : delete options.offset);
    if (row ? (options.limit = +row) : delete options.limit);

    options.where = {
      buyer_id: req.user.id,
    };

    const allTransaction = await Transaction.findAll(options);

    if (allTransaction[0] == null) {
      throw errors.EMPTY_TABLE("Buyer transaction");
    }
    return successMsg.GET_SUCCESS(res, allTransaction);
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
    const { tender_id } = req.body;
    let payment_status;
    const query = req.query;

    if ("pending" in query) {
      payment_status = "PENDING";
    }
    if ("paid" in query) {
      payment_status = "PAID";
    }
    if ("failed" in query) {
      payment_status = "FAILED";
    }

    if (
      payment_status !== "PENDING" &&
      payment_status !== "PAID" &&
      payment_status !== "FAILED"
    ) {
      throw errors.INVALID_PAYMENT_STATUS;
    }

    const checkIfTenderExist = await Tender.findByPk(tender_id);
    if (!checkIfTenderExist) throw errors.NOT_FOUND("Tender", tender_id);
    const checkIfTenderExistInTransaction = await Transaction.findOne({
      where: { tender_id: tender_id },
    });
    if (checkIfTenderExistInTransaction)
      throw errors.AVAILABLE_DATA(
        "Transaction",
        checkIfTenderExistInTransaction.id
      );

    const transactionCreated = await Transaction.create({
      payment_status: payment_status,
      invoice_code: generated_invoice_code,
      price: checkIfTenderExist.price,
      buyer_id: req.user.id,
      seller_id: checkIfTenderExist.seller_id,
      tender_id: tender_id,
    });

    if (transactionCreated)
      return successMsg.CREATE_SUCCESS(res, "Transaction", transactionCreated);
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { tender_id } = req.body;
    const query = req.query;
    let payment_status;

    const checkIfTransactionExist = await Transaction.findByPk(req.params.id);
    if (!checkIfTransactionExist)
      throw errors.NOT_FOUND("Transaction", req.params.id);
    const checkIfTenderExist = await Tender.findByPk(tender_id);
    if (!checkIfTenderExist) throw errors.NOT_FOUND("Tender", tender_id);

    if ("pending" in query) {
      payment_status = "PENDING";
    } else if ("paid" in query) {
      payment_status = "PAID";
    } else if ("failed" in query) {
      payment_status = "FAILED";
    }

    if (
      payment_status !== "PENDING" &&
      payment_status !== "PAID" &&
      payment_status !== "FAILED"
    ) {
      throw errors.INVALID_PAYMENT_STATUS;
    }

    console.log(payment_status);

    const transactionUpdated = await Transaction.update(
      {
        payment_status: payment_status,
        invoice_code: generated_invoice_code,
        // price: price,
        // buyer_id: req.user.id,
        // seller_id: seller_id,
        tender_id: tender_id,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      }
    );
    if (transactionUpdated) {
      const product = await Product.findByPk(checkIfTenderExist.products_id);
      console.log(checkIfTenderExist);
      if (transactionUpdated[1].dataValues.payment_status === "PAID") {
        await Notification.create({
          title: "Berhasil terjual",
          description: `${product.name}<br>${formatter.format(product.price)}`,
          users_id: req.user.id,
          products_id: product.id,
        });
      }
      if (transactionUpdated[1].dataValues.payment_status === "FAILED") {
        await Notification.create({
          title: "Transaksi dibatalkan",
          description: `${product.name}<br>${formatter.format(product.price)}`,
          users_id: req.user.id,
          products_id: product.id,
        });
      }
      return successMsg.UPDATE_SUCCESS(
        res,
        "Transaction",
        req.params.id,
        transactionUpdated
      );
    }
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
  getAllTransactionAsSeller,
  getAllTransactionAsBuyer,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
