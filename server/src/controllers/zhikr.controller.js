const { zhikrScheduler } = require("../services/user.service");
const { todayHijri } = require("../utils/hijriDate");

const getData = async (req, res) => {
  try {
    const year = `${new Date().getFullYear()}`;
    const data = req.user.ibada[year];

    const zhikrData = zhikrScheduler(data);
    const progress = singleTypeProgress("zhikrs", req.user, year);

    res.status(200).json({
      message: "Success",
      data: {
        data: zhikrData,
        progress,
      },
    });
  } catch (error) {
    console.log("Error on the get quran data controller", error);
    res.status().json({
      message: "Internal server error",
    });
  }
};

const tick = async (req, res) => {
  try {
    const { amount, name, date, year } = req.body;
    if (!amount || !name) {
      return res.status(401).json({
        message: "amount and name required",
      });
    }

    if (!req.user.ibada[year][date].zhikrs[name]) {
      return res.status(401).json({
        message: "Invalid zhikr name",
      });
    }

    const yearNow = `${new Date().getFullYear()}`;
    if (year != yearNow || date != toHijri()) {
      return res.status(400).json({
        message: "Invalid time",
      });
    }

    const amountNeed =
      amount > 0 ? amount : req.user.ibada[year][date].zhikrs[name].amount;

    const pages = req.user.ibada[year].khitam.page;
    const khitam = pages / 604;

    req.user.ibada[year][date].zhikrs[name].amount = amountNeed;

    const data = {
      amount: req.user.ibada[year][date].zhikrs[name].amount,
      limit: req.user.ibada[year][date].zhikrs[name].limit,
      progress:
        req.user.ibada[year][date].zhikrs[name].amount /
        req.user.ibada[year][date].zhikrs[name].limit,
    };

    await res.user.save();
    res.status(204).json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log("Error on the tick zhikr coltroller", error);
    res.status(500).json({
      message: "Interna server error",
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { amount, name } = req.body;

    if (!amount || !name) {
      return res.status(401).json({
        message: "amount and name required",
      });
    }

    if (!req.user.ibada[year][date].zhikrs[name]) {
      return res.status(401).json({
        message: "Invalid zhikr name",
      });
    }

    const number = Number(amount);

    
    const year = `${new Date().getFullYear()}`;
    
    const dates = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    const limit = !number ? 1 : number < 1 ? 1 : number;
    
    dates.forEach((date) => {
      req.user.ibada[year][date].zhikrs[name].limit = limit;
    });
    
    await req.user.save();
    req.status(204).json({
      message: "Success",
      data: req.user.ibada[year][todayHijri()].zhikrs[name].limit,
    });
  } catch (error) {
    console.log("Error on the update quran controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getData, tick, updatePlan };
