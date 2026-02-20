const { toHijri } = require("hijri-date/lib/safe");
const {
  quranScheduler,
  singleTypeProgress,
} = require("../services/user.service");
const { khitamValidator } = require("../utils/validate");

const getData = async (req, res) => {
  try {
    const year = `${new Date().getFullYear()}`;
    const data = req.user.ibada[year];

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
    res.status().json({
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
    if (year != yearNow || date != toHijri()) {
      return res.status(400).json({
        message: "Invalid time",
      });
    }

    const amountNeed =
      amount > 0 ? Math.floor(amount) : req.user.ibada[year][date].quran.amount;

    req.user.ibada[year].khitam.page += amountNeed;
    req.user.ibada[year].khitam.page -= req.user.ibada[year][date].quran.amount;

    const pages = req.user.ibada[year].khitam.page;
    const khitam = pages / 604;

    req.user.ibada[year][date].quran.amount = amountNeed;
    req.user.ibada[year].khitam.amount = khitam;

    const data = {
      amount: req.user.ibada[year][date].quran.amount,
      limit: req.user.ibada[year][date].quran.limit,
      progress:
        req.user.ibada[year][date].quran.amount /
        req.user.ibada[year][date].quran.limit,
    };

    await res.user.save();
    res.status(204).json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log("Error on the tick coltroller", error);
    res.status(500).json({
      message: "Interna server error",
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { amount } = req.body;

    const year = `${new Date().getFullYear()}`;
    req.user.ibada[year].khitam.limit = khitamValidator(amount);
    await req.user.save();
    req.status(204).json({
      message: "Success",
      data: req.user.ibada[year].khitam.limit,
    });
  } catch (error) {
    console.log("Error on the update quran controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getData, tick, updatePlan };
