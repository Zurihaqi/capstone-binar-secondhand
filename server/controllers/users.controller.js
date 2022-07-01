const { User } = require("../db/models");
const errors = require("../misc/errors");
const success = require("../misc/success");
const updater = require("../misc/updater");

module.exports = {
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        throw errors.NOT_FOUND("User", id);
      }

      const { email } = req.body;

      if (email) {
        const checkEmail = await User.findOne({
          where: { email: email },
        });

        if (checkEmail && email != user.email) {
          throw errors.AVAILABLE_EMAIL();
        }
      }

      const { name, photo_profile, phone, address, cities_id } = req.body;

      const incomingUserUpdate = updater(
        { name, photo_profile, phone, address, cities_id },
        {}
      );

      await user.update({
        incomingUserUpdate,
      });

      return success.UPDATE_SUCCESS(res, "User", id, incomingUserUpdate);
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ["name", "photo_profile", "phone", "address", "cities_id"],
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
      const { id } = req.params;
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
