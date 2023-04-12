const express = require("express");
const orderRouter = express.Router();
const VerifyTokenController = require("../middleware/VerifyTokenController");
const OrderController = require("../controller/OrderController");

//CREATE

orderRouter.post(
  "/",
  VerifyTokenController.verifyToken,
  OrderController.orderCreate
);

//UPDATE
orderRouter.put(
  "/:id",
  VerifyTokenController.verifyTokenAndAdmin,
  OrderController.orderUpdate
);

//DELETE
orderRouter.delete(
  "/:id",
  VerifyTokenController.verifyTokenAndAdmin,
  OrderController.orderDelete
);

//GET USER ORDERS
orderRouter.get(
  "/find/:userId",
  VerifyTokenController.verifyTokenAndAuthorization,
  OrderController.orderUser
);

// //GET ALL

orderRouter.get(
  "/",
  VerifyTokenController.verifyTokenAndAdmin,
  OrderController.orderShowAll
);

// GET MONTHLY INCOME

orderRouter.get(
  "/income",
  VerifyTokenController.verifyTokenAndAdmin,
  OrderController.monthIncome
);

module.exports = orderRouter;
