const passport = require("passport");
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local")
const UserModel = require('../models/UserModel');
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, cb) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

      return UserModel.checkUser( username, password)
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect username or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
      .catch((err) => {
        console.log(err)
        return cb(null, false, { message: "Error : " + err  });
      });
    }
  )
);

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['user'];
    }
    return token;
};


passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: global.config.JWTtoken,
    },


    (jwtPayload, cb) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

      return UserModel.findUserById(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
