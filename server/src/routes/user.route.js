const { Router } = require("express");
const { initial } = require("../controllers/user.controller");
const { protected } = require("../middlewares/auth.middleware");

const route = Router();

route.use(protected);

route.post("/start", initial);

module.exports = route;
