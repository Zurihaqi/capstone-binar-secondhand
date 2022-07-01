const { Product, User, Category, City } = require("../db/models/");
const Op = require("sequelize").Op;
const errors = require("../misc/errors");
const successMsg = require("../misc/success");

const options = {
  include: [
    {
      model: Category,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
    {
      model: User,
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: City,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    },
  ],
};

const getAllProducts = async (req, res, next) => {
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

    const allProducts = await Product.findAll(options);
    //error handler ketika tabel kosong
    if (allProducts[0] == null) {
      throw errors.EMPTY_TABLE("Product");
    }
    return successMsg.GET_SUCCESS(res, allProducts);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const foundProduct = await Product.findByPk(req.params.id, options);
    if (foundProduct) {
      return successMsg.GET_SUCCESS(res, foundProduct);
    }
    throw errors.NOT_FOUND("Product", req.params.id);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      users_id,
      categories_id,
      product_images,
    } = req.body;

    //Cek apakah users_id atau categories_id ada dalam database sebelum membuat product
    const checkIfUserExist = await User.findByPk(users_id);
    const checkIfCategoryExist = await Category.findByPk(categories_id);

    if (!checkIfUserExist) throw errors.NOT_FOUND("User", users_id);
    if (!checkIfCategoryExist)
      throw errors.NOT_FOUND("Category", categories_id);

    const productCreated = await Product.create({
      name: name,
      price: price,
      description: description,
      product_images: product_images,
      users_id: users_id,
      categories_id: categories_id,
    });
    if (productCreated) {
      return successMsg.CREATE_SUCCESS(res, "Product", productCreated);
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      users_id,
      categories_id,
      product_images,
    } = req.body;

    //hanya cek apabila user atau category id ingin diupdate
    if (users_id) {
      const checkIfUserExist = await User.findByPk(users_id);
      if (!checkIfUserExist) throw errors.NOT_FOUND("User", users_id);
    }
    if (categories_id) {
      const checkIfCategoryExist = await Category.findByPk(categories_id);
      if (!checkIfCategoryExist)
        throw errors.NOT_FOUND("Category", categories_id);
    }

    const productUpdated = await Product.update(
      {
        name: name,
        price: price,
        description: description,
        product_images: product_images,
        users_id: users_id,
        categories_id: categories_id,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    if (productUpdated) {
      return successMsg.UPDATE_SUCCESS(
        res,
        "Product",
        req.params.id,
        productUpdated
      );
    }
    throw errors.NOT_FOUND("Product", req.params.id);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productDeleted = await Product.destroy(
      // { truncate: true, cascade: true },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (productDeleted) {
      return successMsg.DELETE_SUCCESS(res, "Product", req.params.id);
    }
    throw errors.NOT_FOUND("Product", req.params.id);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
