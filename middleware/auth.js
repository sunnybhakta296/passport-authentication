const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/User");

/**------------------------singup------------------------------ */
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

/**------------------------login------------------------------ */

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          done(null, false, { message: `Invalid user/password` });
        }

        const validate = await user.comparePassword(password);
        if (validate) {
          done(null, false, { message: `Invalid user/password` });
        }

        return done(null, user, { message: `Successfully logged In` });
      } catch (error) {
        done(error);
      }
    }
  )
);

/**------------------------verify------------------------------ */
passport.use(
  new JwtStrategy(
    {
      secretOrKey: "SECRET_KEY",
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
