const {
  quranScheduler,
  singleTypeProgress,
  totalProgress,
  totalTodayProgress,
  pageCounter,
} = require("../services/user.service");
const { khitamValidator } = require("../utils/validate");
const { todayHijri } = require("../utils/hijriDate");

const getData = async (req, res) => {
  try {
    const year = `${new Date().getFullYear()}`;
    const data = req.user.ibada.get(year);

    const quranData = quranScheduler(data);
    const progress = singleTypeProgress("khitam", req.user, year);

    res.status(200).json({
      message: "Success",
      data: {
        data: quranData,
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
    const { amount, date, year } = req.body;
    if (!amount) {
      return res.status(401).json({
        message: "amount required",
      });
    }

    const yearNow = `${new Date().getFullYear()}`;
    if (year != yearNow || date != todayHijri()) {
      return res.status(400).json({
        message: "Invalid time",
      });
    }

    const userObj = req.user.toObject();

    const amountNeed =
      amount > 0 ? Math.floor(amount) : userObj.ibada[year][date].quran.amount;

    userObj.ibada.get(year).khitam.page = pageCounter(
      userObj.ibada.get(year),
      userObj.ibada.get(year)[date].quran.amount,
      amountNeed,
    );

    const pages = userObj.ibada.get(year).khitam.page;
    const khitam = pages / 604;

    userObj.ibada.get(year)[date].quran.amount = amountNeed;
    userObj.ibada.get(year).khitam.amount = khitam;

    const data = {
      remedan: date,
      amount: userObj.ibada.get(year)[date].quran.amount,
      limit: userObj.ibada.get(year)[date].quran.limit,
      progress:
        userObj.ibada.get(year)[date].quran.amount /
        userObj.ibada.get(year)[date].quran.limit,
    };

    req.user.ibada = userObj.ibada;

    await req.user.save();
    res.status(200).json({
      message: "Success",
      data,
      progress: {
        today: totalTodayProgress(userObj.ibada.get(year), todayHijri()),
        total: totalProgress(userObj, year),
        quran: singleTypeProgress("khitam", userObj, year),
      },
    });
  } catch (error) {
    console.log("Error on the tick quran coltroller", error);
    res.status(500).json({
      message: "Interna server error",
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { amount } = req.body;

    const year = `${new Date().getFullYear()}`;
    const user = req.user;

    const yearData = user.ibada.get(year);

    if (!yearData) {
      return res.status(400).json({ message: "Year not initialized" });
    }

    const validated = khitamValidator(amount);

    yearData.khitam.limit = validated ?? yearData.khitam.limit;

    user.markModified(`ibada.${year}.khitam.limit`);

    await user.save();

    res.status(200).json({
      message: "Success",
      data: yearData.khitam.limit,
    });
  } catch (error) {
    console.log("Error on update quran controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getData, tick, updatePlan };
