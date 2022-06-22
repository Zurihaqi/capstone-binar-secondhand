const { Wishlist, User, Product } = require("../db/models");
const errors = require("../misc/errors");
const successMsg = require("../misc/successMessages");

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

const getAllWishlist = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    if (skip) options.offset = +skip - 1;
    if (row) options.limit = +row;

    const allWishlist = await Wishlist.findAll(options);

    if (allWishlist[0] == null) {
      throw errors.EMPTY_TABLE;
    }
    return res.status(200).json(successMsg.GET_SUCCESS(allWishlist));
  } catch (error) {
    next(error);
  }
};

const getWishlistById = async (req, res, next) => {
  try {
    const foundWishlist = await Wishlist.findByPk(req.params.id, options);
    if (foundWishlist) {
      return res.status(200).json(successMsg.GET_SUCCESS(foundWishlist));
    }
    throw errors.NOT_FOUND("Wishlist", req.params.id);
  } catch (error) {
    next(error);
  }
};

const createWishlist = async (req, res, next) => {
  try {
    const { users_id, products_id } = req.body;
    const checkIfUserIdExist = await User.findByPk(users_id);
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfUserIdExist) throw errors.NOT_FOUND("User", users_id);
    if (!checkIfProductIdExist) throw errors.NOT_FOUND("Product", products_id);

    const wishlistCreated = await Wishlist.create({
      users_id: users_id,
      products_id: products_id,
    });

    return res
      .status(200)
      .json(successMsg.CREATE_SUCCESS("Wishlist", wishlistCreated));
  } catch (error) {
    next(error);
  }
};

const updateWishlist = async (req, res, next) => {
  try {
    const { users_id, products_id } = req.body;
    const checkIfUserIdExist = await User.findByPk(users_id);
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfUserIdExist) throw errors.NOT_FOUND("User", users_id);
    if (!checkIfProductIdExist) throw errors.NOT_FOUND("Product", products_id);

    const wishlistUpdated = await Wishlist.update(
      {
        users_id: users_id,
        products_id: products_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (wishlistUpdated) {
      return res
        .status(200)
        .json(
          successMsg.UPDATE_SUCCESS("Wishlist", req.params.id, wishlistUpdated)
        );
    }
    throw errors.NOT_FOUND("Wishlist", req.params.id);
  } catch (error) {
    next(error);
  }
};

const deleteWishlist = async (req, res, next) => {
  try {
    const wishlistDeleted = await Wishlist.destroy({
      where: { id: req.params.id },
    });

    if (wishlistDeleted) {
      return res
        .status(200)
        .json(successMsg.DELETE_SUCCESS("Wishlist", req.params.id));
    }
    throw errors.NOT_FOUND("Wishlist", req.params.id);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllWishlist,
  getWishlistById,
  createWishlist,
  updateWishlist,
  deleteWishlist,
};
