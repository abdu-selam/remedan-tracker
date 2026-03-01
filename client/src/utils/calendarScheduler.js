const scheduler = (today, data, type = "quran", curr = null) => {
  const maxDays = Array.from({ length: 35 }, (_, i) => {
    if (i < 30) return i + 1;
    return i - 29;
  });

  let dataInput;
  if (type == "zhikr") {
    const need = data.map((d) => {
      const n = {
        remedan: d.remedan,
        amount: d.zhikr[curr].amount,
        limit: d.zhikr[curr].limit,
        proress: d.zhikr[curr].progress,
        description: d.zhikr[curr].description,
      };

      return n;
    });

    dataInput = need.map((obj) => ({ ...obj }));
  } else dataInput = data.map((obj) => ({ ...obj }));

  const now = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const grigorian = [now.getDate()];
  for (let i = 0; i < today; i++) {
    if (today == 1) break;
    const oneDay = 1000 * 3600 * 24;
    const current = new Date(Date.now() - oneDay * i).getDate();
    if (i != 0) {
      grigorian.unshift(current);
    }
  }

  for (let i = 0; i < 35; i++) {
    const oneDay = 1000 * 3600 * 24;
    const current = new Date(Date.now() + oneDay * i);

    if (
      current.getDate() == now.getDate() &&
      now.getMonth() == current.getMonth()
    )
      continue;

    if (grigorian.length == 35) break;
    grigorian.push(current.getDate());
  }

  const firstDate = new Date(Date.now() - (3600 * 1000 * 24 * (today - 1)));
  const starter = firstDate.getDay();

  if (starter != 0) {
    for (let i = 0; i < starter; i++) {
      maxDays.unshift(30 - i);
      maxDays.pop();
      grigorian.unshift(30 - i);
      grigorian.pop();
      if (type == "quran") {
        dataInput.unshift({
          remedan: 30 - i,
          amount: 0,
          limit: 1,
          proress: 0,
        });
      } else if (type == "terawih") {
        dataInput.unshift({
          remedan: 30 - i,
          done: false,
        });
      } else {
        dataInput.unshift({
          remedan: 30 - i,
          amount: 0,
          limit: 1,
          proress: 0,
          description: "",
        });
      }
    }
  }

  for (let i = 0; i < 35 - dataInput.length; i++) {
    if (35 - dataInput.length != 0) {
      if (type == "quran") {
        dataInput.push({
          remedan: i + 1,
          amount: 0,
          limit: 1,
          proress: 0,
        });
      } else if (type == "terawih") {
        dataInput.push({
          remedan: i + 1,
          done: false,
        });
      } else {
        dataInput.push({
          remedan: i + 1,
          amount: 0,
          limit: 1,
          proress: 0,
          description: "",
        });
      }
    }
  }

  return [maxDays, grigorian, days, today, starter, dataInput];
};

export default scheduler;
