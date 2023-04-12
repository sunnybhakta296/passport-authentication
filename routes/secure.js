const express = require("express");
const router = express.Router();

router.get("/profile", async (req, res, next) => {
  res.json({
    msessage: "secure route",
    user: req.user,
    token: req.query.token,
  });
});

module.exports = router;
