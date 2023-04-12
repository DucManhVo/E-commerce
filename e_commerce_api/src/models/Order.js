const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: { type: String, require: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, require: true },
    address: { type: Object, require: true },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
