const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://akashvishw346:4OcsZ9kgFaPWIi2K@cluster3.zuirvgi.mongodb.net/"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 10,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 10,
  },
  // account: { type: mongoose.Schema.Types.ObjectId, ref: "Accounts" },
});

const bankSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number },
});
const Accounts = mongoose.model("Accounts", bankSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Accounts };
