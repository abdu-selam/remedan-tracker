const { Router } = require("express");
const { signup } = require("../controllers/auth.controller");

const route = Router();

route.post("/register", signup);

module.exports = route;
