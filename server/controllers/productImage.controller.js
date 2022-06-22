const { ProductImage, Product } = require("../db/models");
const errors = require("../misc/errors");
const successMsg = require("../misc/successMessages");

const options = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
  include: [
    {
      model: Product,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  ],
};

const getAllProductImage = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    if (skip) options.offset = +skip - 1;
    if (row) options.limit = +row;

    const allProductImage = await ProductImage.findAll(options);
    if (allProductImage[0] == null) {
      throw errors.EMPTY_TABLE("Product image");
    }
    return res.status(200).json(successMsg.GET_SUCCESS(allProductImage));
  } catch (error) {
    next(error);
  }
};

const getProductImageById = async (req, res, next) => {
  try {
    const foundProductImage = await ProductImage.findByPk(
      req.params.id,
      options
    );
    if (foundProductImage) {
      return res.status(200).json(successMsg.GET_SUCCESS(foundProductImage));
    }
    throw errors.NOT_FOUND("Product image", req.params.id);
  } catch (error) {
    next(error);
  }
};

const createProductImage = async (req, res, next) => {
  try {
    const { products_id } = req.body;

    //Cek apakah products_id ada dalam database sebelum membuat product image
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfProductIdExist) throw errors.NOT_FOUND("Product", products_id);

    const productImageCreated = await ProductImage.create({
      image_url: req.body.image_url,
      products_id: products_id,
    });

    return res
      .status(200)
      .json(successMsg.CREATE_SUCCESS("Product", productImageCreated));
  } catch (error) {
    next(error);
  }
};

const updateProductImage = async (req, res, next) => {
  try {
    const { products_id } = req.body;
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfProductIdExist) throw errors.NOT_FOUND("Product", products_id);

    const productImageUpdated = await ProductImage.update(
      {
        image_url: req.body.image_url,
        products_id: products_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (productImageUpdated) {
      return res
        .status(200)
        .json(
          successMsg.UPDATE_SUCCESS(
            "Product image",
            req.params.id,
            productImageUpdated
          )
        );
    }
    throw errors.NOT_FOUND("Product image", req.params.id);
  } catch (error) {
    next(error);
  }
};

const deleteProductImage = async (req, res, next) => {
  try {
    const productImageDeleted = await ProductImage.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (productImageDeleted) {
      return res
        .status(200)
        .json(successMsg.DELETE_SUCCESS("Product image", req.params.id));
    }
    throw errors.NOT_FOUND("Product image", req.params.id);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProductImage,
  getProductImageById,
  createProductImage,
  updateProductImage,
  deleteProductImage,
};
