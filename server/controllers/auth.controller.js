const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              id: checkUser.id,
              name: checkUser.name,
              email: checkUser.email,
              photo_profile: checkUser.photo_profile
            },
            "secretkey"
          );

          res.status(200).json({
            message: "Login berhasil",
            data: token
          });
        } else {
          res.status(404).json({
            message: "Password pengguna salah"
          });
        }
      } else {
        res.status(404).json({
          message: "Email pengguna tidak ditemukan"
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      const (name, email, password, confirmPassword) = req.body;

      if (password !== confirmPassword) {
        res.status(403).json({ message: 'Password tidak cocok' });
      }

      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail) {
        return res.status(403).json({ message: 'Email sudah terdaftar' });
      }
      const user = await User.create({ name, email, password: bcrypt.hashSync(password, 10), role: 'admin' });
      delete user.dataValues.password;
      res.status(201).json({
        message: 'Berhasil mendaftar',
        data: user,

      });
    } catch (error) {
      next(err);
    }
  }
};
