const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have name!!"],
    minlength: [5, "A user must have equal or less then 5 characters!!"],
    maxlength: [12, "A user must have equal or less then 12 characters!!"],
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
    maxlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
  photo: [String],
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
