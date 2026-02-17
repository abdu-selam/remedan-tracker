const { Router } = require("express");
const {
  signup,
  verifyEmail,
  logIn,
  logOut,
  resendVerify,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const {
  protected,
  tokenCount,
  forgotProtector,
} = require("../middlewares/auth.middleware");

const route = Router();

route.post("/register", signup);
route.post("/verify", verifyEmail);
route.post("/login", logIn);
route.post("/logout", protected, logOut);
route.post("/resend", tokenCount, resendVerify);
route.post("/forgot", forgotProtector, forgotPassword);
route.post("/reset", resetPassword);

module.exports = route;
