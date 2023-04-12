const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let self = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(self.password, salt);
  self.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const self = this;
  return bcrypt.compare(candidatePassword, self.password).catch((e) => false);
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
