const { JWT_SECRET } = process.env;
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const errors = require("../misc/errors");
const { User } = require("../db/models");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    User.findOne({
      where: {
        id: jwt_payload.id,
        name: jwt_payload.name,
        email: jwt_payload.email,
      },
    })
      .then((user) => done(null, user))
      .catch((error) => done(error, false));
  })
);

module.exports = authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) next(error);
    req.user = user;
    if (!user) throw errors.UNAUTHORIZED;
    next();
  })(req, res, next);
};
