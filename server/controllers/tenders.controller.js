const {
  Tender,
  Product,
  User,
  Notification,
  Category,
  Transaction,
  City,
} = require("../db/models");
const errors = require("../misc/errors");
const success = require("../misc/success");
const formatter = require("../helper/currencyFormatter");
const invoice_code = require("../helper/generateInvoiceCode");

const options = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
  include: [
    {
      model: User,
      as: "buyer",
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: City,
        },
      ],
    },
    {
      model: Product,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Category,
        },
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
      ],
    },
  ],
};

module.exports = {
  addTender: async (req, res, next) => {
    try {
      const { price, products_id } = req.body;

      //? Cek ketersediaan
      const buyerExist = await User.findByPk(req.user.id);
      const productExist = await Product.findByPk(products_id);
      const sellerExist = await User.findByPk(productExist.users_id);
      const tenderExist = await Tender.findOne({
        where: {
          buyer_id: req.user.id,
          seller_id: productExist.users_id,
          products_id: products_id,
        },
      });

      //! Cek Error
      if (!buyerExist) throw errors.NOT_FOUND("Buyer", req.user.id);
      if (!productExist) throw errors.NOT_FOUND("Product", products_id);
      if (!sellerExist) throw errors.NOT_FOUND("seller", productExist.users_id);
      if (tenderExist) throw errors.AVAILABLE_DATA("Tender", tenderExist.id);
      if (req.user.id === productExist.users_id)
        throw errors.TENDER_OWN_PRODUCT;

      const tender = await Tender.create({
        offer_status: "PENDING",
        price: price,
        buyer_id: req.user.id,
        seller_id: productExist.users_id,
        products_id: products_id,
      });
      if (tender) {
        await Notification.create({
          title: "Penawaran produk",
          description: `${productExist.name}<br>${formatter.format(
            productExist.price
          )}<br>Ditawar ${formatter.format(tender.price)}`,
          users_id: productExist.users_id,
          products_id: tender.products_id,
        });
        return success.CREATE_SUCCESS(res, "Tender", tender);
      }
    } catch (error) {
      next(error);
    }
  },
  updateTender: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { price } = req.body;

      const tender = await Tender.findByPk(id, options);
      let offer_status;
      let defaultPrice;

      const query = req.query;

      if ("accepted" in query) {
        offer_status = "ACCEPTED";
      } else if ("rejected" in query) {
        offer_status = "REJECTED";
      } else {
        offer_status = "PENDING";
      }
      //? Cek ketersediaan
      // const buyerExist = await User.findByPk(buyer_id);
      // const sellerExist = await User.findByPk(seller_id);
      // const productExist = await Product.findByPk(products_id);

      //! Cek Error
      // if (!buyerExist) throw errors.NOT_FOUND("Buyer", buyer_id);
      // if (!sellerExist) throw errors.NOT_FOUND("seller", seller_id);
      // if (!productExist) throw errors.NOT_FOUND("Product", products_id);

      if (tender) {
        //Jika tidak mengirimkan price pada body maka akan menggunakan tender.price
        if (price ? (defaultPrice = +price) : (defaultPrice = tender.price));

        //Error ketika tender sudah pernah disetujui sebelumnya dan ingin disetujui lagi (mencegah transaksi duplikat)
        if (tender.offer_status === "ACCEPTED") {
          if (tender.offer_status === offer_status)
            throw errors.TENDER_ALREADY_ACCEPTED(id);
        }

        const updateTender = await Tender.update(
          {
            offer_status: offer_status,
            price: defaultPrice,
            // buyer_id: buyer_id,
            // seller_id: seller_id,
            // products_id: products_id,
          },
          { where: { id: id }, returning: true, plain: true }
        );
        if (updateTender[1].dataValues.offer_status === "ACCEPTED") {
          await Transaction.create({
            payment_status: "PENDING",
            invoice_code: invoice_code,
            price: tender.price,
            buyer_id: tender.buyer_id,
            seller_id: tender.seller_id,
            tender_id: tender.id,
          });
          return success.UPDATE_SUCCESS(res, "Tender", id, updateTender[1]);
        }
        if (
          updateTender[1].dataValues.offer_status === "REJECTED" ||
          updateTender[1].dataValues.offer_status === "PENDING"
        ) {
          return success.UPDATE_SUCCESS(res, "Tender", id, updateTender[1]);
        }
      }
      throw errors.NOT_FOUND("Tender", id);
    } catch (error) {
      next(error);
    }
  },
  getAllTenders: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.user);
      const tenders = await Tender.findAll({
        ...options,
      });
      if (tenders) {
        return success.GET_SUCCESS(res, tenders);
      }
      throw errors.EMPTY_TABLE("Tender");
    } catch (error) {
      next(error);
    }
  },
  getAllSellerTenders: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.user);
      const tenders = await Tender.findAll({
        ...options,
        where: {
          seller_id: user.id,
        },
      });
      if (tenders.length) {
        return success.GET_SUCCESS(res, tenders);
      }
      throw errors.EMPTY_TABLE("Seller tender");
    } catch (error) {
      next(error);
    }
  },
  getAllBuyerTenders: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.user);
      const tenders = await Tender.findAll({
        ...options,
        where: {
          buyer_id: user.id,
        },
      });
      if (tenders.length) {
        return success.GET_SUCCESS(res, tenders);
      }
      throw errors.EMPTY_TABLE("Buyer tender");
    } catch (error) {
      next(error);
    }
  },
  getTenderById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const tender = await Tender.findByPk(id, options);
      console.log(tender);
      if (tender) {
        return success.GET_SUCCESS(res, tender);
      }
      throw errors.NOT_FOUND("Tender", id);
    } catch (error) {
      next(error);
    }
  },
  deleteTenderById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedTender = await Tender.findByPk(id);
      if (deletedTender) {
        deletedTender.destroy(id);
        return success.DELETE_SUCCESS(res, "Tender", id);
      }
      throw errors.NOT_FOUND("Tender", id);
    } catch (error) {
      next(error);
    }
  },
};
