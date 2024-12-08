const mongoose = require("mongoose");
const brcypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await brcypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
