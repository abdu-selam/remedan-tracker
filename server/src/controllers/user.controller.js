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
    const today = todayHijri();

    if (!req.user.ibada) req.user.ibada = {};
    const userIbada = req.user.ibada;

    if (userIbada[year]) {
      return res.status(200).json({
        message: "Already initiate",
      });
    }

    const azhkars = {
      special: {
        night: { description: "", done: false },
        morning: { description: "", done: false },
        sleep: { description: "", done: false },
      },
    };

    if (zhikrs && zhikrs.length) {
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

    userIbada[year] = {
      khitam: {
        amount: 0,
        page: 0,
        limit: khitamValidator(khitam) ?? 1,
      },
      terawih: {
        amount: 0,
        limit: terawihValidator(terawih) ?? 29,
      },
    };

    const dates = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

    dates.forEach((day) => {
      req.user.ibada[year][day] = {
        terawih: false,
        quran: {
          amount: 0,
          limit: khitamCalculator(userIbada[year].khitam.limit),
        },
        zhikrs: structuredClone(azhkars),
        date: Date.now(),
      };
    });

    req.user.ibada.set(year, userIbada[year]);
    req.user.initiated = true;

    await req.user.save();

    res.status(200).json({
      message: "Success",
      data: {
        user: {
          name: req.user.name,
          progress: {
            total: totalProgress(req.user, year),
            today: totalTodayProgress(userIbada[year], today),
          },
        },
        ibada: {
          quran: {
            progress: singleTypeProgress("khitam", req.user, year),
            data: quranScheduler(userIbada[year]),
          },
        },
        today,
      },
    });
  } catch (error) {
    console.log("Error on the initial controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const update = async (req, res) => {
  try {
    const updated = req.body?.updated;
    if (!updated) {
      return res.status(401).json({
        message: "Update parameter required",
      });
    }

    if (!req.user.update.includes(updated)) {
      req.user.update = [...req.user.update, updated];
      await req.user.save();
    }

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log("Error on the update controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { initial, update };
