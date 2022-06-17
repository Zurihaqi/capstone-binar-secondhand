const { ProductImage, Product } = require("../db/models");

const options = {
    attributes: {
        exclude: ['created_at', 'updated_at'],
    },
    include: 
    [{
        model: Product,
        attributes: {
            exclude: ["created_at", "updated_at"]
        }   
    }]
};

const getAllProductImage = async (req, res) => {
    try{
        let {skip, row} = req.query;

        if(skip) options.offset = +skip - 1;
        if(row) options.limit = +row;

        const allProductImage = await ProductImage.findAll(options);
        if(allProductImage){
            return res.status(200).json({
                status: "Success",
                data: allProductImage
            });
        };
        throw({code: 404, status: "Not Found", message: `ProductImage table is empty`});
    }catch(error){
        if(error.code){
            return res.status(error.code).json({
                status: error.status,
                message: error.message
            });
        };
        return res.status(500).json({
            status: 'Internal server error',
            message: error.message
        });
    };
};

const getProductImageById = async (req, res) => {
    try{
        const foundProductImage = await ProductImage.findByPk(req.params.id, options);
        if(foundProductImage){
            return res.status(200).json({
                status: "Success",
                data: foundProductImage
            });
        };
        throw({code: 404, status: "Not Found", message: `ProductImage with id ${req.params.id} not found`});
    }catch(error){
        if(error.code){
            return res.status(error.code).json({
                status: error.status,
                message: error.message
            });
        };
        return res.status(500).json({
            status: 'Internal server error',
            message: error.message
        });
    };
};

const createProductImage = async (req, res) => {
    try{
        const { image_url, products_id } = req.body;

        const productImageCreated = await ProductImage.create({
            image_url: image_url,
            products_id: products_id
        });

        return res.status(200).json({
            status: "ProductImage created successfully",
            data: productImageCreated
        });

    }catch(error){
        if(error.code){
            return res.status(error.code).json({
                status: error.status,
                message: error.message
            });
        };
        return res.status(500).json({
            status: 'Internal server error',
            message: error.message
        });
    };
};

const updateProductImage = async (req, res) => {
    try{
        const { image_url, products_id } = req.body;

        const productImageUpdated = await ProductImage.update({
            image_url: image_url,
            products_id: products_id
        },{
            where: {
                id: req.params.id
            }
        });

        if(productImageUpdated){
            return res.status(200).json({
                status: "ProductImage updated successfully",
                data: productImageUpdated
            });
        };
        throw({code: 404, status: 'Not found', message: `ProductImage with id ${req.params.id} not found`});
    
    }catch(error){
        if(error.code){
            return res.status(error.code).json({
                status: error.status,
                message: error.message
            });
        };
        return res.status(500).json({
            status: 'Internal server error',
            message: error.message
        });
    };
};

const deleteProductImage = async (req, res) => {
    try{
        const productImageDeleted = await ProductImage.destroy({
            where: {
                id: req.params.id
            }
        });

        if(productImageDeleted){
            return res.status(200).json({
                status: `ProductImage with id ${req.params.id} deleted successfully`
            });
        };
        throw({code: 404, status: 'Not found', message: `ProductImage with id ${req.params.id} not found`});

    }catch(error){
        if(error.code){
            return res.status(error.code).json({
                status: error.status,
                message: error.message
            });
        };
        return res.status(500).json({
            status: 'Internal server error',
            message: error.message
        });
    };
};

module.exports = {
    getAllProductImage,
    getProductImageById,
    createProductImage,
    updateProductImage,
    deleteProductImage
}