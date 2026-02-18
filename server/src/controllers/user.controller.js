const {
  khitamCalculator,
  totalProgress,
  singleTypeProgress,
  quranScheduler,
  totalTodayProgress,
} = require("../services/user.service");
const { todayHijri } = require("../utils/hijriDate");
const { khitamValidator, terawihValidator } = require("../utils/validate");

const initial = async (req, res) => {
  try {
    const { khitam, zhikrs, terawih } = req.body;

    const now = new Date();
    const year = `${now.getFullYear()}`;
    const date = `${todayHijri()}`;

    let { ibada } = req.user;

    if (ibada) {
      return res.status(200).json({
        message: "Already initiate",
      });
    }

    const azhkars = {
      special: {
        night: {
          description: "",
          done: false,
        },
        morning: {
          description: "",
          done: false,
        },
        sleep: {
          description: "",
          done: false,
        },
      },
    };

    if (zhikrs.length) {
      for (const obj of zhikrs) {
        const { name, description, limit } = obj;
        const number = Number(limit);

        if (!name || !description) continue;
        if (azhkars[name]) continue;

        azhkars[name] = {
          description,
          limit: !number ? 1 : number < 1 ? 1 : number,
          amount: 0,
        };
      }
    }

    req.user.ibada = {};
    req.user.ibada[year] = {
      khitam: {
        amount: 0,
        limit: khitamValidator(khitam) ?? 1,
      },
      terawih: {
        amount: 0,
        limit: khitamValidator(khitam) ?? 29,
      },
    };

    req.user.ibada[year][date] = {
      terawih: false,
      quran: {
        amount: 0,
        limit: khitamCalculator(req.user.ibada[year].khitam),
      },
      zhikrs: azhkars,
      date: Date.now(),
    };

    await req.user.save();

    res.status(200).json({
      message: "Success",
      data: {
        user: {
          name: req.user.name,
          progress: {
            total: totalProgress(req.user, year),
            today: totalTodayProgress(req.user.ibada[year], date),
          },
        },
        ibada: {
          quran: {
            progress: singleTypeProgress("khitam", req.user, year),
            data: quranScheduler(req.user.ibada[year]),
          },
        },
        today: todayHijri(),
      },
    });
  } catch (error) {
    console.log("Error on the initial controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { initial };
