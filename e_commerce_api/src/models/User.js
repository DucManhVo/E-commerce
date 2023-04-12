const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const User = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, unique: true, require: true },
    isAdmin: { type: Boolean, default: false },
    slug: { type: String, slug: "username", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
