const khitamCalculator = (khitam) => {
  const totalPages = khitam * 604;
  const khitamPerDay = Math.round(totalPages / 29);

  return khitamPerDay;
};

const zhikrAmountExtractor = (data) => {
  let limit = 0;
  let amount = 0;
  for (const key in data) {
    if (["khitam", "terawih"].includes(key)) continue;

    const zhikrs = data[key].zhikrs;

    for (const zhikr in zhikrs) {
      if (zhikr == "special") {
        const specials = zhikrs[zhikr];
        for (const key in specials) {
          amount += specials[key].done ? 1 : 0;
          limit += 1;
        }
        continue;
      }

      const elem = zhikrs[zhikr];
      amount += elem.amount;
      limit += elem.limit;
    }
  }

  return [amount, limit];
};

const totalProgress = (user, year) => {
  const data = user.ibada[year];
  const [zhikrAmount, zhikrLimit] = zhikrAmountExtractor(data);
  const [khitamAmount, khitamLimit] = [data.khitam.amount, data.khitam.limit];
  const [terawwihAmount, terawwihLimit] = [
    data.terawih.amount,
    data.terawih.limit,
  ];

  const totalAmount = zhikrAmount + khitamAmount + terawwihAmount;
  const totalLimit = zhikrLimit + khitamLimit + terawwihLimit;

  return totalAmount / totalLimit;
};

const totalTodayProgress = (userData, date) => {
  const data = {};
  data[date] = { ...userData[date] };
  const [zhikrAmount, zhikrLimit] = zhikrAmountExtractor(data);
  const [khitamAmount, khitamLimit] = [
    data[date].quran.amount,
    data[date].quran.limit,
  ];
  const [terawwihAmount, terawwihLimit] = [data[date].terawih ? 1 : 0, 1];

  const totalAmount = zhikrAmount + khitamAmount + terawwihAmount;
  const totalLimit = zhikrLimit + khitamLimit + terawwihLimit;

  return totalAmount / totalLimit;
};

const singleTypeProgress = (type, user, year) => {
  const data = user.ibada[year];
  if (type == "zhikrs") {
    const [amount, limit] = zhikrAmountExtractor(data);
    return amount / limit;
  }
  return data[type].amount / data[type].limit;
};

const quranScheduler = (data) => {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  const result = [];

  days.forEach((day) => {
    const date = data[day];
    const obj = {
      remedan: day,
    };
    if (!date) {
      obj.amount = 0;
      obj.limit = 0;
      obj.progress = 0;
    } else {
      obj.amount = date.quran.amount;
      obj.limit = date.quran.limit;
      obj.progress = obj.amount / obj.limit;
    }

    result.push(obj);
  });

  return result;
};

module.exports = {
  khitamCalculator,
  singleTypeProgress,
  totalProgress,
  quranScheduler,
  totalTodayProgress,
};
