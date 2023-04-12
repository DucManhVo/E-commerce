const express = require("express");
const stripeRouter = express.Router();
const StripeController = require("../controller/StripeController");

stripeRouter.post("/payment", StripeController.stripePay);

module.exports = stripeRouter;
