const { Router } = require("express");
const {
  signup,
  verifyEmail,
  login,
} = require("../controllers/auth.controller");

const route = Router();

route.post("/register", signup);
route.post("/verify", verifyEmail);
route.post("/login", login);

module.exports = route;
