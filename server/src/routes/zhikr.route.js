const { Router } = require("express");
const {
  getData,
  tick,
  updatePlan,
} = require("../controllers/zhikr.controller");

const route = Router();

route.get("/", getData);

route.put("/tick", tick);
route.put("/plan", updatePlan);

module.exports = route;
