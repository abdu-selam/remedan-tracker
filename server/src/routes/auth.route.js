const { Router } = require("express");
const {
  signup,
  verifyEmail,
  logIn,
  logOut,
  resendVerify,
} = require("../controllers/auth.controller");

const { protected, tokenCount } = require("../middlewares/auth.middleware");

const route = Router();

route.post("/register", signup);
route.post("/verify", verifyEmail);
route.post("/login", logIn);
route.post("/logout", protected, logOut);
route.post("/resend", tokenCount, resendVerify);

module.exports = route;
