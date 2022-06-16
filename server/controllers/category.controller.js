const { Category } = require('../db/models/categories');

const getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.findAll();

        res.status(201).json({
            status: 'Success',
            data: allCategory
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Category.findByPk(id);

        if (!result) {
            return res.status(404).json({
                status: 'error',
                message: `Category with id ${id} not found`
            })
        }

        res.status(201).json({
            status: 'Success',
            data: result
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};


const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const createdCategory = await Category.create({
            name: name
        });

        res.status(201).json({
            status: 'Success',
            data: createdCategory
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const { name } = req.body;

        const findCategoryId = await Category.findOne({
            where: {
                id
            }
        })

        if (!findCategoryId) {
            return res.status(404).json({
                status: 'error',
                message: `Category with id ${id} not found`
            })
        }

        if (name) findCategoryId.name = name;

        const update = await findCategoryId.save();

        if (!update) {
            return res.status(404).json({
                status: 'error',
                message: `data Category with id ${id} not found`
            })
        }


        res.status(201).json({
            status: 'success',
            data: update
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const findCategoryId = await Category.findByPk(id);

        if (!findCategoryId) {
            return res.status(404).json({
                status: 'error',
                message: `Category with id ${id} not found`
            })
        }

        const deleteCategory = Category.destroy();

        if (!deleteCategory) {
            return res.status(503).json({
                status: 'error',
                message: `Category with id ${id} failed deleted`
            })
        }


        res.status(201).json({
            status: 'success',
            message: `Category with id ${id} deleted`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
};



module.exports = {
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};
