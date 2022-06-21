const { useCLS } = require("sequelize");
const { User } = require("../db/models");

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.findAll();

    res.status(201).json({
      status: "Success",
      data: allUser
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByParams(id);

    if (!result) {
      return res.status(404).json({
        status: "error",
        message: `User with id ${id} not found`
      });
    }

    res.status(201).json({
      status: "Success",
      data: result
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    const createUser = await User.create({
      name: name
    });

    res.statu(201).json({
      status: "Success",
      data: createUser
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const findUserId = await User.findOne({
      where: {
        id
      }
    });

    if (!findUserId) {
      return res.status(404).json({
        statu: "error",
        message: `User with Id ${id} not found`
      });
    }

    if (name) findUserId.name = name;

    const update = await findUserId.save();

    if (!update) {
      return res.statu(404).json({
        status: "Error",
        message: `User with Id ${id} not found`
      });
    }

    res.statu(201).json({
      status: "Success",
      data: update
    });
  } catch (error) {
    res.statu(404).json({
      message: error.message
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findUserId = await User.findByPk(id);

    if (!findUserId) {
      return res.status(404).json({
        status: "Error",
        message: `User with id ${id}  noot found`
      });
    }
    const deleteUser = User.destroy();

    if (!deleteUser) {
      return res.status(503).json({
        status: "Error",
        message: `User with id ${id} failed delete`
      });
    }
    res.status(201).json({
      status: "Success",
      message: `User with id ${id} success delete`
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
