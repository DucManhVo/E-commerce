const express = require("express");
const userRouter = express.Router();
const VerifyTokenController = require("../middleware/VerifyTokenController");
const UserController = require("../controller/UserController");

//UPDATE
userRouter.put(
  "/:id",
  VerifyTokenController.verifyTokenAndAdmin,
  UserController.userUpdate
);

//DELETE
userRouter.delete(
  "/:id",
  VerifyTokenController.verifyTokenAndAdmin,
  UserController.userDelete
);

//GET USER
userRouter.get(
  "/find/:id",
  VerifyTokenController.verifyTokenAndAdmin,
  UserController.userShowOne
);

//GET ALL USER
userRouter.get(
  "/",
  VerifyTokenController.verifyTokenAndAdmin,
  UserController.userShowAll
);

//GET ALL USER STATS
userRouter.get(
  "/stats",
  VerifyTokenController.verifyTokenAndAdmin,
  UserController.userStat
);
module.exports = userRouter;
