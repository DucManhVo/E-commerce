const express = require("express");
const cartRouter = express.Router();
const VerifyTokenController = require("../middleware/VerifyTokenController");
const CartController = require("../controller/CartController");

//CREATE

cartRouter.post(
  "/",
  VerifyTokenController.verifyTokenAndAuthorization,
  CartController.cartCreate
);

//UPDATE
cartRouter.put(
  "/:id",
  VerifyTokenController.verifyTokenAndAuthorization,
  CartController.cartUpdate
);

//DELETE
cartRouter.delete(
  "/:id",
  VerifyTokenController.verifyTokenAndAuthorization,
  CartController.cartDelete
);

//GET USER CART
cartRouter.get(
  "/find/:userId",
  VerifyTokenController.verifyTokenAndAuthorization,
  CartController.cartShowOne
);

// //GET ALL

cartRouter.get(
  "/",
  VerifyTokenController.verifyTokenAndAdmin,
  CartController.cartShowAll
);
module.exports = cartRouter;
