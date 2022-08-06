const {
  Product,
  User,
  Category,
  City,
  Notification,
} = require("../db/models/");
const formatter = require("../helper/currencyFormatter");
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
    let integerQueries = [];
    for (const [key, value] of Object.entries(req.query)) {
      if (
        key !== "skip" &&
        key !== "row" &&
        key !== "categories_id" &&
        key !== "price" &&
        key !== "users_id"
      )
        queries.push({ [key]: value });
      if (key === "categories_id" || key === "price" || key === "users_id")
        integerQueries.push({ [key]: value });
    }
    if (queries.length != 0) {
      if (Object.keys(queries[0]) == "categories_name") {
        const category = await Category.findOne({
          where: {
            name: { [Op.iLike]: "%" + Object.values(queries[0]) + "%" },
          },
        });
        if (category) {
          integerQueries = [{ categories_id: category.id }];
        }
        if (!category) throw errors.EMPTY_TABLE("Product");
      }
    }

    //pagination, row = limit, skip = offset
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
    if (
      integerQueries[0]
        ? (options.where = {
            [Op.or]: [
              {
                [Object.keys(integerQueries[0])]: Object.values(
                  integerQueries[0]
                ),
              },
            ],
          })
        : delete options.where
    );

    // options.where = {
    //   ...options.where,
    //   status: "publish",
    // };

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
const getAllPublishedProducts = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    let queries = [];
    let integerQueries = [];
    for (const [key, value] of Object.entries(req.query)) {
      if (
        key !== "skip" &&
        key !== "row" &&
        key !== "categories_id" &&
        key !== "price" &&
        key !== "users_id"
      )
        queries.push({ [key]: value });
      if (key === "categories_id" || key === "price" || key === "users_id")
        integerQueries.push({ [key]: value });
    }
    if (queries.length != 0) {
      if (Object.keys(queries[0]) == "categories_name") {
        const category = await Category.findOne({
          where: { name: Object.values(queries[0]) },
        });
        if (category) {
          integerQueries = [{ categories_id: category.id }];
        }
        if (!category) throw errors.EMPTY_TABLE("Product");
      }
    }

    //pagination, row = limit, skip = offset
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
    if (
      integerQueries[0]
        ? (options.where = {
            [Op.or]: [
              {
                [Object.keys(integerQueries[0])]: Object.values(
                  integerQueries[0]
                ),
              },
            ],
          })
        : delete options.where
    );

    options.where = {
      ...options.where,
      status: "publish",
    };

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
const getAllMyProducts = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    let queries = [];
    let integerQueries = [];
    for (const [key, value] of Object.entries(req.query)) {
      if (
        key !== "skip" &&
        key !== "row" &&
        key !== "categories_id" &&
        key !== "price" &&
        key !== "users_id"
      )
        queries.push({ [key]: value });
      if (key === "categories_id" || key === "price" || key === "users_id")
        integerQueries.push({ [key]: value });
    }
    if (queries.length != 0) {
      if (Object.keys(queries[0]) == "categories_name") {
        const category = await Category.findOne({
          where: { name: Object.values(queries[0]) },
        });
        if (category) {
          integerQueries = [{ categories_id: category.id }];
        }
        if (!category) throw errors.EMPTY_TABLE("Product");
      }
    }

    //pagination, row = limit, skip = offset
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
    if (
      integerQueries[0]
        ? (options.where = {
            [Op.or]: [
              {
                [Object.keys(integerQueries[0])]: Object.values(
                  integerQueries[0]
                ),
              },
            ],
          })
        : delete options.where
    );

    options.where = {
      users_id: req.user.id,
    };

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
    const { name, price, description, categories_id, product_images } =
      req.body;

    const users_id = req.user.id;

    let status = "publish";

    const query = req.query;

    if ("preview" in query) {
      status = "preview";
    }

    //Cek apakah users_id atau categories_id ada dalam database sebelum membuat product
    const checkIfUserExist = await User.findByPk(users_id);
    const checkIfCategoryExist = await Category.findByPk(categories_id);

    if (!checkIfUserExist) throw errors.NOT_FOUND("User", users_id);
    if (!checkIfCategoryExist)
      throw errors.NOT_FOUND("Category", categories_id);

    /*
    Note atribut notif
    title: title,
    description: description,
    users_id: users_id,
    products_id: products_id,
    **/

    const productCreated = await Product.create({
      name: name,
      price: price,
      description: description,
      product_images: product_images,
      status: status,
      users_id: users_id,
      categories_id: categories_id,
    });
    if (productCreated.status === "preview") {
      return successMsg.CREATE_SUCCESS(res, "Product", productCreated);
    }
    if (productCreated.status === "publish") {
      await Notification.create({
        title: "Berhasil diterbitkan",
        description: `${productCreated.name}<br>${formatter.format(
          productCreated.price
        )}`,
        users_id: req.user.id,
        products_id: productCreated.id,
      });
      return successMsg.CREATE_SUCCESS(res, "Product", productCreated);
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, categories_id, product_images } =
      req.body;

    let status = "publish";

    const query = req.query;

    if ("preview" in query) {
      status = "preview";
    }

    const checkIfProductExist = await Product.findByPk(req.params.id);
    if (!checkIfProductExist) throw errors.NOT_FOUND("Product", req.params.id);
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
        status: status,
        categories_id: categories_id,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      }
    );

    if (productUpdated[1].dataValues.status === "preview") {
      return successMsg.UPDATE_SUCCESS(
        res,
        "Product",
        req.params.id,
        productUpdated[1]
      );
    }
    if (productUpdated[1].dataValues.status === "publish") {
      await Notification.create({
        title: "Berhasil diterbitkan",
        description: `${
          productUpdated[1].dataValues.name
        }<br>${formatter.format(productUpdated[1].dataValues.price)}`,
        users_id: req.user.id,
        products_id: productUpdated[1].dataValues.id,
      });
      return successMsg.UPDATE_SUCCESS(
        res,
        "Product",
        req.params.id,
        productUpdated[1]
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
  getAllPublishedProducts,
  getAllMyProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
