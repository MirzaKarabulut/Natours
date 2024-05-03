const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have name!!"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email!!"],
    unique: true,
    lowecase: true,
    validate: [validator.isEmail, "Please provide a valid email!!"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password!!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    // this only works CREATE and SAVE!!
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords are not the same!!",
    },
  },
  photo: [String],
});
usersSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

usersSchema.methods.verifyPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
