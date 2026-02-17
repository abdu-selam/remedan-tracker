const { Router } = require("express");
const {
  signup,
  verifyEmail,
  logIn,
  logOut,
} = require("../controllers/auth.controller");

const { protected } = require("../middlewares/auth.middleware");

const route = Router();

route.post("/register", signup);
route.post("/verify", verifyEmail);
route.post("/login", logIn);
route.post("/logout", protected, logOut);

module.exports = route;
