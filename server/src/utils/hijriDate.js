const { default: HijriDate, toHijri } = require("hijri-date/lib/safe");

const todayHijri = () => {
  const now = new Date();

  const today = toHijri(now);
  if (now.getHours() < 18 && now.getMinutes() < 30) return today - 1;
  return today;
};

module.exports = { todayHijri };
