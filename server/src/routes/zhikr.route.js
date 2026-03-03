const { Router } = require("express");
const {
  getData,
  tick,
  updatePlan,
  addZhikr,
} = require("../controllers/zhikr.controller");
const { protected } = require("../middlewares/auth.middleware");

const route = Router();

route.use(protected);

route.get("/", getData);

route.put("/tick", tick);

route.put("/plan", updatePlan);

route.post("/new", addZhikr);

module.exports = route;
