const { Notification, User, Product } = require("../db/models");
const errors = require("../misc/errors");

const options = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
  include: [
    {
      model: User,
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    },
    {
      model: Product,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  ],
};

const getAllNotifications = async (req, res, next) => {
  try {
    let { skip, row } = req.query;

    if (skip) options.offset = +skip - 1;
    if (row) options.limit = +row;

    const allNotifications = await Notification.findAll(options);

    if (allNotifications[0] == null) {
      throw errors.EMPTY_TABLE;
    }
    return res.status(200).json({
      status: "Successs",
      data: allNotifications,
    });
  } catch (error) {
    next(error);
  }
};

const getNotificationById = async (req, res, next) => {
  try {
    const foundNotification = await Notification.findByPk(
      req.params.id,
      options
    );
    if (foundNotification) {
      return res.status(200).json({
        status: "Success",
        data: foundNotification,
      });
    }
    throw errors.NOT_FOUND("Notification", req.params.id);
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const { title, description, users_id, products_id } = req.body;
    const checkIfUserIdExist = await User.findByPk(users_id);
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfUserIdExist) throw errors.NOT_FOUND("User", users_id);
    if (!checkIfProductIdExist) throw errors.NOT_FOUND("Product", products_id);

    const NotificationCreated = await Notification.create({
      title: title,
      description: description,
      users_id: users_id,
      products_id: products_id,
    });

    return res.status(200).json({
      status: "Notification created successfully",
      data: NotificationCreated,
    });
  } catch (error) {
    next(error);
  }
};

const updateNotification = async (req, res, next) => {
  try {
    const { title, description, users_id, products_id } = req.body;
    const checkIfUserIdExist = await User.findByPk(users_id);
    const checkIfProductIdExist = await Product.findByPk(products_id);

    if (!checkIfUserIdExist) throw errors.NOT_FOUND("User", users_id);
    if (!checkIfProductIdExist) throw errors.NOT_FOUND("Product", products_id);

    const NotificationUpdated = await Notification.update(
      {
        title: title,
        description: description,
        users_id: users_id,
        products_id: products_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (NotificationUpdated) {
      return res.status(200).json({
        status: "Notification updated successfully",
        data: NotificationUpdated,
      });
    }
    throw errors.NOT_FOUND("Notification", req.params.id);
  } catch (error) {
    next(error);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const NotificationDeleted = await Notification.destroy({
      where: { id: req.params.id },
    });

    if (NotificationDeleted) {
      return res.status(200).json({
        status: `Notification with id ${req.params.id} successfully deleted`,
      });
    }
    throw errors.NOT_FOUND("Notification", req.params.id);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
