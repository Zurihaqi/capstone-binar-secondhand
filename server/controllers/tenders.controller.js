const { Tender, Product, User, Notification } = require("../db/models");
const errors = require("../misc/errors");
const success = require("../misc/success");
const formatter = require("../helper/currencyFormatter");

const options = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
  // include: [
  //   {
  //     model: User,
  //     attributes: {
  //       exclude: ["password", "createdAt", "updatedAt"],
  //     },
  //   },
  //   {
  //     model: Product,
  //     attributes: {
  //       exclude: ["createdAt", "updatedAt"],
  //     },
  //     include: [
  //       {
  //         model: User,
  //         attributes: {
  //           exclude: ["password", "createdAt", "updatedAt"],
  //         },
  //       },
  //     ],
  //   },
  // ],
};

module.exports = {
  addTender: async (req, res, next) => {
    try {
      console.log(req.user.id);
      const { offer_status, price, products_id } = req.body;

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
      if (!buyerExist) throw errors.NOT_FOUND("Buyer", buyer_id);
      if (!sellerExist) throw errors.NOT_FOUND("seller", seller_id);
      if (!productExist) throw errors.NOT_FOUND("Product", products_id);
      if (tenderExist) throw errors.AVAILABLE_DATA("Tender", tenderExist.id);

      const tender = await Tender.create({
        offer_status: offer_status,
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
          users_id: req.user.id,
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
      const { offer_status, price } = req.body;

      if (offer_status && price) {
        //? Cek ketersediaan
        // const buyerExist = await User.findByPk(buyer_id);
        // const sellerExist = await User.findByPk(seller_id);
        // const productExist = await Product.findByPk(products_id);

        //! Cek Error
        // if (!buyerExist) throw errors.NOT_FOUND("Buyer", buyer_id);
        // if (!sellerExist) throw errors.NOT_FOUND("seller", seller_id);
        // if (!productExist) throw errors.NOT_FOUND("Product", products_id);

        await Tender.update(
          {
            offer_status: offer_status,
            price: price,
            // buyer_id: buyer_id,
            // seller_id: seller_id,
            // products_id: products_id,
          },
          { where: { id: id } }
        );
        const tender = await Tender.findByPk(id, options);
        if (tender) {
          return success.UPDATE_SUCCESS(res, "Tender", id, tender);
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
      if (tenders) {
        return success.GET_SUCCESS(res, tenders);
      }
      throw errors.EMPTY_TABLE("Tender");
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
      if (tenders) {
        return success.GET_SUCCESS(res, tenders);
      }
      throw errors.EMPTY_TABLE("Tender");
    } catch (error) {
      next(error);
    }
  },
  getTenderById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const tender = await Tender.findByPk(id, options);
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
