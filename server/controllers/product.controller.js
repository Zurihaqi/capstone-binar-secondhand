const { Product, User, Category } = require("../db/models/");

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
        exclude: ["createdAt", "updatedAt"],
      },
    },
  ],
};

const getAllProducts = async (req, res) => {
  try {
    //pagination, row = limit, skip = offset
    let { skip, row } = req.query;

    if (skip) options.offset = +skip - 1;
    if (row) options.limit = +row;

    const allProducts = await Product.findAll(options);
    if (!allProducts == null) {
      return res.status(200).json({
        status: "Success",
        data: allProducts,
      });
    }
    throw {
      code: 404,
      status: "Not Found",
      message: `Products table is empty`,
    };
  } catch (error) {
    //jika error memiliki "error.code" yang dilemparkan, akan dikirimkan ke error handler ini
    if (error.code) {
      return res.status(error.code).json({
        status: error.status,
        message: error.message,
      });
    }
    //jika tidak ada "error.code" yang dilemparkan, akan dianggap sebagai internal server error
    return res.status(500).json({
      status: "Internal server error",
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const foundProduct = await Product.findByPk(req.params.id, options);
    if (foundProduct) {
      return res.status(200).json({
        status: "Success",
        data: foundProduct,
      });
    }
    throw {
      code: 404,
      status: "Not Found",
      message: `Product with id ${req.params.id} not found`,
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
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, users_id, categories_id } = req.body;

    //Cek apakah users_id atau categories_id ada dalam database sebelum membuat product
    const checkIfUserExist = await User.findByPk(users_id);
    const checkIfCategoryExist = await Category.findByPk(categories_id);

    if (!checkIfUserExist)
      throw {
        code: 404,
        status: "Not found",
        message: `User with id ${users_id} doesn't exist in database`,
      };
    if (!checkIfCategoryExist)
      throw {
        code: 404,
        status: "Not found",
        message: `Category with id ${categories_id} doesn't exist in database`,
      };

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
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, users_id, categories_id } = req.body;
    const checkIfUserExist = await User.findByPk(users_id);
    const checkIfCategoryExist = await Category.findByPk(categories_id);

    if (!checkIfUserExist)
      throw {
        code: 404,
        status: "Not found",
        message: `User with id ${users_id} doesn't exist in database`,
      };
    if (!checkIfCategoryExist)
      throw {
        code: 404,
        status: "Not found",
        message: `Category with id ${categories_id} doesn't exist in database`,
      };

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
    throw {
      code: 404,
      status: "Not found",
      message: `Product with id ${req.params.id} not found`,
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
};

const deleteProduct = async (req, res) => {
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
    throw {
      code: 404,
      status: "Not found",
      message: `Product with id ${req.params.id} not found`,
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
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
