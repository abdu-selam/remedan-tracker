const { Router } = require("express");
const { signup, verifyEmail } = require("../controllers/auth.controller");

const route = Router();

route.post("/register", signup);
route.post("/verify", verifyEmail);

module.exports = route;
