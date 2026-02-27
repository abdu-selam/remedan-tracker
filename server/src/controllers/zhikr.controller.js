const {
  zhikrScheduler,
  singleTypeProgress,
  totalProgress,
  totalTodayProgress,
} = require("../services/user.service");
const { todayHijri } = require("../utils/hijriDate");

const getData = async (req, res) => {
  try {
    const year = `${new Date().getFullYear()}`;
    const data = req.user.ibada.get(year);

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
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const tick = async (req, res) => {
  try {
    const { amount, name, date, year } = req.body;
    if (!name) {
      return res.status(401).json({
        message: "name required",
      });
    }

    const isSpecial = ["night", "morning", "sleep"].includes(name);

    if (
      (isSpecial && ![false, true].includes(amount)) ||
      (!isSpecial && !amount)
    ) {
      return res.status(401).json({
        message: "amount required",
      });
    }

    if (!req.user.ibada.get(year)[date].zhikrs[name] && !isSpecial) {
      return res.status(401).json({
        message: "Invalid zhikr name",
      });
    }

    const yearNow = `${new Date().getFullYear()}`;
    if (year != yearNow || date != todayHijri()) {
      return res.status(400).json({
        message: "Invalid time",
      });
    }
    const data = {
      remedan: date,
    };

    if (!isSpecial) {
      const amountNeed =
        amount > 0
          ? amount
          : req.user.ibada.get(year)[date].zhikrs[name].amount;

      req.user.ibada.get(year)[date].zhikrs[name].amount = amountNeed;
      req.user.markModified(`ibada.${year}.${date}.zhikrs.${name}.amount`);
      data.amount = req.user.ibada.get(year)[date].zhikrs[name].amount;
      data.limit = req.user.ibada.get(year)[date].zhikrs[name].limit;
      data.progress =
        req.user.ibada.get(year)[date].zhikrs[name].amount /
        req.user.ibada.get(year)[date].zhikrs[name].limit;
      data.description =
        req.user.ibada.get(year)[date].zhikrs[name].description;
    } else {
      const amountNeed = [false, true].includes(amount)
        ? amount
        : req.user.ibada.get(year)[date].zhikrs.special[name].done;

      req.user.ibada.get(year)[date].zhikrs.special[name].done = amountNeed;
      req.user.markModified(
        `ibada.${year}.${date}.zhikrs.special.${name}.done`,
      );
      data.amount = req.user.ibada.get(year)[date].zhikrs.special[name].done
        ? 1
        : 0;
      data.limit = 1;
      data.progress = Number(
        req.user.ibada.get(year)[date].zhikrs.special[name].done,
      );
      data.description =
        req.user.ibada.get(year)[date].zhikrs.special[name].description;
    }

    await req.user.save();
    res.status(200).json({
      message: "Success",
      data,
      progress: {
        today: totalTodayProgress(req.user.ibada.get(year), todayHijri()),
        total: totalProgress(req.user, year),
        zhikr: singleTypeProgress("zhikrs", req.user, year),
      },
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
    const year = `${new Date().getFullYear()}`;

    if (!req.user.ibada.get(year)["1"].zhikrs[name]) {
      return res.status(401).json({
        message: "Invalid zhikr name",
      });
    }

    const number = Number(amount);

    const dates = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    const limit = !number ? 1 : number < 1 ? 1 : number;

    dates.forEach((date) => {
      req.user.ibada.get(year)[date].zhikrs[name].limit = limit;
      req.user.markModified(`ibada.${year}.${date}.zhikrs.${name}.limit`);
    });

    await req.user.save();
    res.status(200).json({
      message: "Success",
      data: {
        name,
        limit: req.user.ibada.get(year)[todayHijri()].zhikrs[name].limit,
      },
    });
  } catch (error) {
    console.log("Error on the update quran controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getData, tick, updatePlan };
