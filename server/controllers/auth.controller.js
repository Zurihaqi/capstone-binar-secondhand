const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, SALT_ROUNDS } = process.env;
const errors = require("../misc/errors");
const success = require("../misc/success");

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userRegistered = await User.findOne({
        where: { email: email },
      });
      if (!userRegistered) throw errors.NOT_REGISTERED(email);
      const validPassword = bcrypt.compareSync(
        password.toString(),
        userRegistered.password
      );
      if (validPassword) {
        const payload = {
          id: userRegistered.id,
          name: userRegistered.name,
          email: userRegistered.email,
          photo_profile: userRegistered.photo_profile,
          phone: userRegistered.phone,
          address: userRegistered.address,
          cities_id: userRegistered.cities_id,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        return success.LOGIN_SUCCESS(res, token, userRegistered.id);
      }
      throw errors.INVALID_CRED;
    } catch (error) {
      next(error);
    }
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail) {
        throw errors.EMAIL_REGISTERED(email);
      }
      const userCreated = await User.create({
        name: name,
        email: email,
        password: password,
      });
      if (userCreated) {
        const data = { name: userCreated.name, email: userCreated.email };
        return success.REGISTER_SUCCESS(res, data);
      }
    } catch (error) {
      next(error);
    }
  },
};
