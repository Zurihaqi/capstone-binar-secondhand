const { Product, User, Category } = require("../db/models/");
const errors = require("../misc/errors");

const options = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
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
    },
  ],
};

const getAllProducts = async (req, res, next) => {
  try {
    //pagination, row = limit, skip = offset
    let { skip, row } = req.query;

    if (skip) options.offset = +skip - 1;
    if (row) options.limit = +row;

    const allProducts = await Product.findAll(options);
    //error handler ketika tabel kosong
    if (allProducts[0] == null) {
      throw errors.EMPTY_TABLE;
    }
    return res.status(200).json({
      status: "Success",
      data: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const foundProduct = await Product.findByPk(req.params.id, options);
    if (foundProduct) {
      return res.status(200).json({
        status: "Success",
        data: foundProduct,
      });
    }
    throw errors.NOT_FOUND("Product", req.params.id);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, users_id, categories_id } = req.body;

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
      users_id: users_id,
      categories_id: categories_id,
    });

    return res.status(200).json({
      status: "Product created successfully",
      data: productCreated,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, users_id, categories_id } = req.body;
    const checkIfUserExist = await User.findByPk(users_id);
    const checkIfCategoryExist = await Category.findByPk(categories_id);

    if (!checkIfUserExist) throw errors.NOT_FOUND("User", users_id);
    if (!checkIfCategoryExist)
      throw errors.NOT_FOUND("Category", categories_id);

    const productUpdated = await Product.update(
      {
        name: name,
        price: price,
        description: description,
        users_id: users_id,
        categories_id: categories_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (productUpdated) {
      return res.status(200).json({
        status: "Product updated successfully",
        data: productUpdated,
      });
    }
    throw errors.NOT_FOUND("Product", req.params.id);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productDeleted = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (productDeleted) {
      return res.status(200).json({
        status: `Product with id ${req.params.id} deleted successfully`,
      });
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
