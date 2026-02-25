const scheduler = (today) => {
  const maxDays = Array.from({ length: 35 }, (_, i) => {
    if (i < 30) return i + 1;
    return i - 29;
  });

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

  if (now.getDay() != 0) {
    for (let i = 0; i < now.getDay(); i++) {
      maxDays.unshift(30 - i);
      maxDays.pop();
      grigorian.unshift(30 - i);
      grigorian.pop();
    }
  }

  const starter = maxDays.indexOf(1);
  
  return [maxDays, grigorian, days, today, starter]
};


export default scheduler