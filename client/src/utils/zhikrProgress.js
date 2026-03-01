export const todayProgress = (zhikrData) => {
  const zhikrs = zhikrData.zhikr;
  let amount = 0;
  let limit = 0;
  for (const key in zhikrs) {
    const elem = zhikrs[key];
    amount += elem.amount;
    limit += elem.limit;
  }

  return Math.round((amount / limit) * 100);
};

export const totalProgress = (zhikrData) => {
  let amount = 0;
  let limit = 0;

  for (const elem of zhikrData) {
    const zhikrs = elem.zhikr;
    for (const key in zhikrs) {
      const elem = zhikrs[key];
      amount += elem.amount;
      limit += elem.limit;
    }
  }

  return Math.round((amount / limit) * 100);
};
