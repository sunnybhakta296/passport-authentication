const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    return res.json({
      message: "registed successfully",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, data) => {
    try {
      if (err || !user) {
        console.log(err, user);
        return next(new Error(err));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const payload = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: payload }, "SECRET_KEY");

        return res.json({
          token,
        });
      });
    } catch (err) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
