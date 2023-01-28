const express = require("express");
const auth = require("../middleware/auth");
const authRouter = express.Router();
const AuthController = require("../controllers/AuthController");

authRouter.route("/sign-up").post(AuthController?.signUp);
authRouter.route("/sign-in").post(AuthController?.signIn);
authRouter.route("/sign-out", auth).post(AuthController?.signOut);

module.exports = authRouter;
