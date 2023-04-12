const express = require("express");
const authRouter = express.Router();

const AuthController = require("../controller/AuthController");

//Register
authRouter.post("/register", AuthController.userRegister);

//Login
authRouter.post("/login", AuthController.userLogin);

//ForgotPass
authRouter.post("/forgot", AuthController.userForgotPass);

//ResetPass
authRouter.get("/reset/:id/:token", AuthController.userResetPass);

module.exports = authRouter;
