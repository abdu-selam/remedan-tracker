const { Router } = require("express");
const rateLimit = require("express-rate-limit");

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

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later",
});

route.post("/register", apiLimiter, signup);
route.post("/login", apiLimiter, logIn);
route.delete("/logout", protected, logOut);

route.post("/verify", verifyEmail);
route.post("/resend", tokenCount, resendVerify);

route.post("/forgot", forgotProtector, forgotPassword);
route.put("/reset", resetPassword);

route.get("/refresh", refreshTokenFunc);
route.get("/me", me);

module.exports = route;
