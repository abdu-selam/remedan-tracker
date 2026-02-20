const { terawihScheduler } = require("../services/user.service");
const { terawihValidator } = require("../utils/validate");

const getData = async (req, res) => {
  try {
    const year = `${new Date().getFullYear()}`;
    const data = req.user.ibada[year];

    const terawihData = terawihScheduler(data);
    const progress = singleTypeProgress("terawih", req.user, year);

    res.status(200).json({
      message: "Success",
      data: {
        data: terawihData,
        progress,
      },
    });
  } catch (error) {
    console.log("Error on the get terawih data controller", error);
    res.status().json({
      message: "Internal server error",
    });
  }
};

const tick = async (req, res) => {
  try {
    const { ticked, date, year } = req.body;
    if (![false, true].includes(ticked)) {
      return res.status(401).json({
        message: "deside tick",
      });
    }

    const yearNow = `${new Date().getFullYear()}`;
    if (year != yearNow || date != toHijri()) {
      return res.status(400).json({
        message: "Invalid time",
      });
    }

    const current = req.user.ibada[year].terawih.amount;
    const today = req.user.ibada[year][date].terawih;

    if (today != ticked) {
      req.user.ibada[year].terawih.amount = ticked ? current + 1 : current - 1;
      req.user.ibada[year][date].terawih = ticked;
      await req.user.save();
    }

    res.status(204).json({
      message: "Success",
      data: req.user.ibada[year][date].terawih,
    });
  } catch (error) {
    console.log("Error on the tick terawih coltroller", error);
    res.status(500).json({
      message: "Interna server error",
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { amount } = req.body;

    const year = `${new Date().getFullYear()}`;
    req.user.ibada[year].terawih.limit = terawihValidator(amount) ?? 29;
    await req.user.save();
    req.status(204).json({
      message: "Success",
      data: req.user.ibada[year].terawih.limit,
    });
  } catch (error) {
    console.log("Error on the update terawih controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getData, tick, updatePlan };
