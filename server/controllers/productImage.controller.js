const { ProductImage, Product } = require("../db/models");
const errors = require("../misc/errors");
const successMsg = require("../misc/success");

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
    return successMsg.GET_SUCCESS(res, allProductImage);
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
      return successMsg.GET_SUCCESS(res, foundProductImage);
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

    if (!checkIfProductIdExist)
      throw errors.NOT_FOUND("Product image", products_id);

    const productImageCreated = await ProductImage.create({
      image_url: req.body.image_url,
      products_id: products_id,
    });

    return successMsg.CREATE_SUCCESS(res, "Product image", productImageCreated);
  } catch (error) {
    next(error);
  }
};

const updateProductImage = async (req, res, next) => {
  try {
    const { products_id } = req.body;
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfProductIdExist)
      throw errors.NOT_FOUND("Product image", products_id);

    const productImageUpdated = await ProductImage.update(
      {
        image_url: req.body.image_url,
        products_id: products_id,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    if (productImageUpdated) {
      return successMsg.UPDATE_SUCCESS(
        res,
        "Product image",
        req.params.id,
        productImageUpdated
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
      return successMsg.DELETE_SUCCESS(res, "Product image", req.params.id);
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
