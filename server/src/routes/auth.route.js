const { Router } = require("express");
const {
  signup,
  verifyEmail,
  logIn,
  logOut,
  resendVerify,
  forgotPassword,
  resetPassword,
  refreshTokenFunc,
  me,
} = require("../controllers/auth.controller");

const {
  protected,
  tokenCount,
  forgotProtector,
} = require("../middlewares/auth.middleware");

const route = Router();

route.post("/register", signup);
route.post("/login", logIn);
route.delete("/logout", protected, logOut);

route.post("/verify", verifyEmail);
route.post("/resend", tokenCount, resendVerify);

route.post("/forgot", forgotProtector, forgotPassword);
route.put("/reset", resetPassword);

route.get("/refresh", refreshTokenFunc);
route.get("/me", me);

module.exports = route;
