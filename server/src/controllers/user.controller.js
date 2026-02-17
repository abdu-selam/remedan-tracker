const {
  khitamValidator,
  terawihValidator,
  khitamCalculator,
} = require("../utils/validate");

const initial = async (req, res) => {
  const { khitam, zhikrs, terawih } = req.body;

  const now = new Date();
  const year = `${now.getFullYear()}`;
  const date = `${now.getDate()}`;

  let { ibada } = req.user;

  if (ibada) {
    return res.status(200).json({
      message: "Already initiate",
    });
  }

  req.user.ibada = {};
  req.user.ibada[year] = {
    khitam: khitamValidator(khitam) ?? 1,
    terawih: terawihValidator(terawih) ?? 29,
  };
  req.user.ibada[year][date] = {
    terawih: false,
    quran: {
      amount: 0,
      limit: khitamCalculator(req.user.ibada[year].khitam),
    },
  };
};
