const { Tender, Product, User } = require("../db/models");
const errors = require("../misc/errors");

const options = {
  attributes: {
    exclude: ["updated_at"],
  },
  include: [
    {
      model: Product,
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    },
    {
      model: User,
      attributes: {
        exclude: ["password", "created_at", "updated_at"],
      },
    },
  ],
};

module.exports = {
  addTender: async (req, res) => {
    try {
      const { offer_status, price, buyer_id, seller_id, products_id } =
        req.body;

      //? Cek ketersediaan
      const buyerExist = await User.findByPk(buyer_id);
      const sellerExist = await User.findByPk(seller_id);
      const productExist = await Product.findByPk(products_id);
      const tenderExist = await Tender.findOne({
        where: {
          buyer_id: buyer_id,
          seller_id: seller_id,
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
        buyer_id: buyer_id,
        seller_id: seller_id,
        products_id: products_id,
      });
      return res.status(201).json({
        status: "Tender created successfully",
        data: tender,
      });
    } catch (error) {
      next(error);
    }
  },
  updateTender: async (req, res) => {
    try {
      const { offer_status, price, buyer_id, seller_id, products_id } =
        req.body;
      const { id } = req.params;

      //? Cek ketersediaan
      const buyerExist = await User.findByPk(buyer_id);
      const sellerExist = await User.findByPk(seller_id);
      const productExist = await Product.findByPk(products_id);

      //! Cek Error
      if (!buyerExist) throw errors.NOT_FOUND("Buyer", buyer_id);
      if (!sellerExist) throw errors.NOT_FOUND("seller", seller_id);
      if (!productExist) throw errors.NOT_FOUND("Product", products_id);

      const tender = await Tender.update(
        {
          offer_status: offer_status,
          price: price,
          buyer_id: buyer_id,
          seller_id: seller_id,
          products_id: products_id,
        },
        { where: { id: id } }
      );
      if (tender) {
        return res.status(201).json({
          status: "Tender created successfully",
          data: tender,
        });
      }
      throw errors.NOT_FOUND("Tender", id);
    } catch (error) {
      next(error);
    }
  },
  getAllTenders: async (req, res) => {
    try {
      const tenders = await Tender.findAll(options);
      if (tenders) {
        return res.status(200).json({
          status: "Success",
          data: tenders,
        });
      }
      throw {
        code: 404,
        status: "Not Found",
        message: "You not have Tender",
      };
    } catch (error) {
      next(error);
    }
  },
  getTenderById: async (req, res) => {
    try {
      const { id } = req.params;
      const tender = await Tender.findByPk(id, options);
      if (tender) {
        return res.status(200).json({
          status: "Success",
          data: tender,
        });
      }
      throw errors.NOT_FOUND("Tender", id);
    } catch (error) {
      next(error);
    }
  },
  deleteTenderById: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTender = await Tender.findByPk(id, options);
      if (deletedTender) {
        return res.status(200).json({
          status: `Tender with ID ${id} deleted successfully`,
        });
      }
      throw errors.NOT_FOUND("Tender", id);
    } catch (error) {
      next(error);
    }
  },
};
