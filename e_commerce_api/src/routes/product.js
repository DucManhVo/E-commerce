const express = require("express");
const productRouter = express.Router();
const VerifyTokenController = require("../middleware/VerifyTokenController");
const ProductController = require("../controller/ProductController");

//CREATE
productRouter.post(
  "/",
  VerifyTokenController.verifyTokenAndAdmin,
  ProductController.productCreate
);

///UPDATE
productRouter.put(
  "/:id",
  VerifyTokenController.verifyTokenAndAdmin,
  ProductController.productUpdate
);

//DELETE
productRouter.delete(
  "/:id",
  VerifyTokenController.verifyTokenAndAdmin,
  ProductController.productDelete
);

//GET PRODUCT
productRouter.get("/find/:id", ProductController.productShowOne);

//GET ALL PRODUCTS
productRouter.get("/", ProductController.productShowAll);

module.exports = productRouter;
