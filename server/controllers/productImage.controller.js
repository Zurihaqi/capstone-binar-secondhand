const { ProductImage, Product } = require("../db/models");
const errors = require("../misc/errors");

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
      throw errors.EMPTY_TABLE;
    }
    return res.status(200).json({
      status: "Success",
      data: allProductImage,
    });
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
    if (!foundProductImage == null) {
      return res.status(200).json({
        status: "Success",
        data: foundProductImage,
      });
    }
    throw errors.PRODUCT_IMAGE_NOT_FOUND(req.params.id);
  } catch (error) {
    next(error);
  }
};

const createProductImage = async (req, res, next) => {
  try {
    const { products_id } = req.body;

    //Cek apakah products_id ada dalam database sebelum membuat product image
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfProductIdExist) throw errors.PRODUCT_NOT_FOUND(products_id);

    const productImageCreated = await ProductImage.create({
      image_url: req.body.image_url,
      products_id: products_id,
    });

    return res.status(200).json({
      status: "ProductImage created successfully",
      data: productImageCreated,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductImage = async (req, res, next) => {
  try {
    const { products_id } = req.body;
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfProductIdExist) throw errors.PRODUCT_NOT_FOUND(products_id);

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
      return res.status(200).json({
        status: "ProductImage updated successfully",
        data: productImageUpdated,
      });
    }
    throw errors.PRODUCT_IMAGE_NOT_FOUND(req.params.id);
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
      return res.status(200).json({
        status: `ProductImage with id ${req.params.id} deleted successfully`,
      });
    }
    throw errors.PRODUCT_IMAGE_NOT_FOUND(req.params.id);
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
