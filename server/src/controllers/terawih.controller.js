const {
  terawihScheduler,
  singleTypeProgress,
  totalProgress,
  totalTodayProgress,
} = require("../services/user.service");
const { todayHijri } = require("../utils/hijriDate");
const { terawihValidator } = require("../utils/validate");

const getData = async (req, res) => {
  try {
    const year = `${new Date().getFullYear()}`;
    const data = req.user.ibada.get(year);

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
    res.status(500).json({
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
    if (year != yearNow || date != todayHijri()) {
      return res.status(400).json({
        message: "Invalid time",
      });
    }

    const current = req.user.ibada.get(year).terawih.amount;
    const today = req.user.ibada.get(year)[date].terawih;

    if (today != ticked) {
      req.user.ibada.get(year).terawih.amount = ticked
        ? current + 1
        : current - 1;
      req.user.ibada.get(year)[date].terawih = ticked;
      req.user.markModified(`ibada.${year}.terawih.amount`);
      req.user.markModified(`ibada.${year}.${date}.terawih`);

      await req.user.save();
    }

    res.status(200).json({
      message: "Success",
      data: {
        remedan: date,
        done: req.user.ibada.get(year)[date].terawih,
      },
      progress: {
        today: totalTodayProgress(req.user.ibada.get(year), todayHijri()),
        total: totalProgress(req.user, year),
        terawih: singleTypeProgress("terawih", req.user, year),
      },
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
    req.user.ibada.get(year).terawih.limit = terawihValidator(amount) ?? 29;
    req.user.markModified(`ibada.${year}.terawih.limit`);

    await req.user.save();
    res.status(200).json({
      message: "Success",
      data: req.user.ibada.get(year).terawih.limit,
    });
  } catch (error) {
    console.log("Error on the update terawih controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getData, tick, updatePlan };
