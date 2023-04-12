const productRouter = require("./product");
const authRouter = require("./auth");
const orderRouter = require("./order");
const cartRouter = require("./cart");
const userRouter = require("./user");
const stripeRouter = require("./stripe");

function route(app) {
  app.use("/product", productRouter);
  app.use("/auth", authRouter);
  app.use("/order", orderRouter);
  app.use("/cart", cartRouter);
  app.use("/user", userRouter);
  app.use("/stripe", stripeRouter);
}
module.exports = route;
