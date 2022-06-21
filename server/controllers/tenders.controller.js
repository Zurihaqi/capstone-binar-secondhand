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
      const { offer_status, price, users_id, products_id } = req.body;

      //? Cek ketersediaan
      const userExist = await User.findByPk(users_id);
      const productExist = await Product.findByPk(products_id);
      const tenderExist = await Tender.findOne({
        where: {
          users_id: users_id,
          products_id: products_id,
        },
      });

      //! Cek Error
      if (!userExist) throw errors.NOT_FOUND("User", users_id);
      if (!productExist) throw errors.NOT_FOUND("Product", products_id);
      if (tenderExist) throw errors.AVAILABLE_DATA("Tender", tenderExist.id);

      const tender = await Tender.create({
        offer_status: offer_status,
        price: price,
        users_id: users_id,
        products_id: products_id,
      });
      return res.status(200).json({
        status: "Tender created successfully",
        data: tender,
      });
    } catch (error) {
      if (error.code) {
        return res.status(error.code).json({
          status: error.status,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: "Internal server error",
        message: error.message,
      });
    }
  },
  updateTender: async (req, res) => {
    try {
      const { offer_status, price, users_id, products_id } = req.body;
      const { id } = req.params;

      //? Cek ketersediaan
      const userExist = await User.findByPk(users_id);
      const productExist = await Product.findByPk(products_id);

      //! Cek Error
      if (!userExist) throw errors.NOT_FOUND("User", users_id);
      if (!productExist) throw errors.NOT_FOUND("Product", products_id);

      const tender = await Tender.update(
        {
          offer_status: offer_status,
          price: price,
          users_id: users_id,
          products_id: products_id,
        },
        { where: { id: id } }
      );
      if (tender) {
        return res.status(200).json({
          status: "Tender created successfully",
          data: tender,
        });
      }
      throw errors.NOT_FOUND("Tender", id);
    } catch (error) {
      if (error.code) {
        return res.status(error.code).json({
          status: error.status,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: "Internal server error",
        message: error.message,
      });
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
      if (error.code) {
        return res.status(error.code).json({
          status: error.status,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: "Internal server error",
        message: error.message,
      });
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
      if (error.code) {
        return res.status(error.code).json({
          status: error.status,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: "Internal server error",
        message: error.message,
      });
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
      if (error.code) {
        return res.status(error.code).json({
          status: error.status,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: "Internal server error",
        message: error.message,
      });
    }
  },
};
