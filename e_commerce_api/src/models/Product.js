const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Product = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    image: { type: String, require: true },
    categories: { type: Array },
    color: { type: String },
    price: { type: Number, require: true },
    //inStock: { type: Boolean, default: true },
    //newSeal: { type: Boolean, default: true },
    slug: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
