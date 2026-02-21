const { Router } = require("express");
const {
  getData,
  tick,
  updatePlan,
} = require("../controllers/zhikr.controller");
const { protected } = require("../middlewares/auth.middleware");

const route = Router();

route.use(protected);

route.get("/", getData);

route.put("/tick", tick);
route.put("/plan", updatePlan);

module.exports = route;
