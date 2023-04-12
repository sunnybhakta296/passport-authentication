const express = require("express");
const connect = require("./utils/connect");
const publicRoute = require("./routes/public");
const secureRoute = require("./routes/secure");
const passport = require("passport");
require("./middleware/auth");

const app = express();
app.use(express.json());

app.use("/", publicRoute);
app.use(
  "/secure",
  passport.authenticate("jwt", { session: false }),
  secureRoute
);

const PORT = 1337;
app.listen(PORT, async () => {
  await connect();
  console.log("Application started at ", PORT);
});
