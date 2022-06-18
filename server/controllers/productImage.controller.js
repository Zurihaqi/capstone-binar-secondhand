const { ProductImage, Product } = require("../db/models");

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

const getAllProductImage = async (req, res) => {
  try {
    let { skip, row } = req.query;

    if (skip) options.offset = +skip - 1;
    if (row) options.limit = +row;

    const allProductImage = await ProductImage.findAll(options);
    if (allProductImage[0] == null) {
      throw {
        code: 404,
        status: "Not Found",
        message: `ProductImage table is empty`,
      };
    }
    return res.status(200).json({
      status: "Success",
      data: allProductImage,
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

const getProductImageById = async (req, res) => {
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
    throw {
      code: 404,
      status: "Not Found",
      message: `ProductImage with id ${req.params.id} not found`,
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

const createProductImage = async (req, res) => {
  try {
    const { products_id } = req.body;

    //Cek apakah products_id ada dalam database sebelum membuat product image
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfProductIdExist)
      throw {
        code: 404,
        status: "Not found",
        message: `Product with id ${products_id} doesn't exist in database`,
      };

    const productImageCreated = await ProductImage.create({
      image_url: req.body.uploadResult.secure_url,
      products_id: products_id,
    });

    return res.status(200).json({
      status: "ProductImage created successfully",
      data: productImageCreated,
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

const updateProductImage = async (req, res) => {
  try {
    const { products_id } = req.body;
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfProductIdExist)
      throw {
        code: 404,
        status: "Not found",
        message: `Product with id ${products_id} doesn't exist in database`,
      };

    const productImageUpdated = await ProductImage.update(
      {
        image_url: req.body.uploadResult.secure_url,
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
    throw {
      code: 404,
      status: "Not found",
      message: `ProductImage with id ${req.params.id} not found`,
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

const deleteProductImage = async (req, res) => {
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
    throw {
      code: 404,
      status: "Not found",
      message: `ProductImage with id ${req.params.id} not found`,
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
  getAllProductImage,
  getProductImageById,
  createProductImage,
  updateProductImage,
  deleteProductImage,
};
