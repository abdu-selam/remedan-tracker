const { Router } = require("express");
const { initial, update } = require("../controllers/user.controller");
const { protected } = require("../middlewares/auth.middleware");

const route = Router();

route.use(protected);

route.post("/start", initial);

route.put("/updated", update);

module.exports = route;
