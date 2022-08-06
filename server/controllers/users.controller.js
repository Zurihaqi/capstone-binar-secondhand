const { User, City } = require("../db/models");
const errors = require("../misc/errors");
const success = require("../misc/success");
const updater = require("../misc/updater");

module.exports = {
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id);

      if (!user) {
        throw errors.NOT_FOUND("User", id);
      }

      // const { email } = req.body;

      // if (email) {
      //   const checkEmail = await User.findOne({
      //     where: { email: email },
      //   });

      //   if (checkEmail && email != user.email) {
      //     throw errors.AVAILABLE_EMAIL();
      //   }
      // }

      const { name, photo_profile, phone, address, cities_id } = req.body;

      if (!req.body) {
        return success.UPDATE_SUCCESS(res, "User", id, {});
      }

      const incomingUserUpdate = updater(
        { name, photo_profile, phone, address, cities_id },
        {}
      );

      if (!incomingUserUpdate) {
        const error = {};
        error.message = "EmptyBody";
        next(error);
      }

      await user.update({
        ...incomingUserUpdate,
      });

      return success.UPDATE_SUCCESS(res, "User", id, incomingUserUpdate);
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: ["name", "photo_profile", "phone", "address"],
        include: [
          {
            model: City,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (user) {
        return success.GET_SUCCESS(res, user);
      }
      throw errors.NOT_FOUND("User", id);
    } catch (error) {
      next(error);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.user;
      const deletedUser = await User.findByPk(id, {
        attributes: ["name", "photo_profile", "phone", "address", "cities_id"],
      });
      if (deletedUser) {
        return success.DELETE_SUCCESS(res, "User", id);
      }
      throw errors.NOT_FOUND("User", id);
    } catch (error) {
      next(error);
    }
  },
};
