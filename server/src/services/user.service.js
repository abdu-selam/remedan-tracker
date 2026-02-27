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
  const data = user.ibada.get(year);
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
  data[date] = { ...userData[`${date}`] };
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
  const data = user.ibada.get(year);
  if (type == "zhikrs") {
    const [amount, limit] = zhikrAmountExtractor(data);
    return amount / limit;
  }
  if (type == "khitam") return data[type].page;
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
      obj.limit = 21;
      obj.progress = 0;
    } else {
      obj.amount = date.quran.amount ?? 0;
      obj.limit = date.quran.limit ?? 21;
      obj.progress = obj.amount / obj.limit;
    }

    result.push(obj);
  });

  return result;
};

const zhikrScheduler = (data) => {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  const result = [];

  days.forEach((day) => {
    const date = { ...data[day] };

    const zhikrData = date.zhikrs;
    for (const key in zhikrData) {
      const zhikr = zhikrData[key];
      let progress = 0;
      if (key == "special") {
        const night = zhikrData.special.night;
        const morning = zhikrData.special.morning;
        const sleep = zhikrData.special.sleep;

        zhikrData.night = {
          description: night.description,
          limit: 1,
          amount: night.done ? 1 : 0,
          progress: night.done ? 1 : 0,
        };

        zhikrData.morning = {
          description: morning.description,
          limit: 1,
          amount: morning.done ? 1 : 0,
          progress: morning.done ? 1 : 0,
        };

        zhikrData.sleep = {
          description: sleep.description,
          limit: 1,
          amount: sleep.done ? 1 : 0,
          progress: sleep.done ? 1 : 0,
        };

        delete zhikrData.special;
      } else {
        let progress = zhikr.amount / zhikr.limit;
        zhikrData[key].progress = progress;
      }
    }

    result.push({
      remedan: day,
      zhikr: zhikrData,
    });
  });

  return result;
};

const terawihScheduler = (data) => {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  const result = [];

  days.forEach((day) => {
    const date = data[day];
    const obj = {
      remedan: day,
      done: date.terawih ?? false,
    };

    result.push(obj);
  });

  return result;
};

const pageCounter = (data, amount, newAmount) => {
  let page = 0;
  const days = Array.from({ length: 30 }, (_, i) => `${i}`);
  for (const key in data) {
    if (days.includes(key)) {
      page += data[key].quran.amount;
    }
  }

  page -= amount;
  page += newAmount;
  return page;
};

module.exports = {
  khitamCalculator,
  singleTypeProgress,
  totalProgress,
  quranScheduler,
  totalTodayProgress,
  terawihScheduler,
  zhikrScheduler,
  pageCounter,
};
