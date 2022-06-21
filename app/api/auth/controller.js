const { User } = require('../db/models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {
    signIn: async(req, res, next) => {
        try {
            const {email, password} = req.body;

            const checkUser = await User.findOne({where: {email: email}});

            if(checkUser){
                
                const checkPassword = bcrypt.compareSync(password, checkUser.password);

                if(checkPassword){
                    const token = jwt.sign({
                        id: checkUser.id,
                        name: checkUser.name,
                        email: checkUser.email,
                        photo_profile: checkUser.photo_profile,
                    }, 'secretkey');

                    res.status(200).json({
                        message: "Login berhasil",
                        data: token,
                    });

                }else{
                    res.status(404).json({
                        message: "Password pengguna salah"
                    });
                }

            }else{
                res.status(404).json({
                    message: "Email pengguna tidak ditemukan"
                });
            }


        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};