const { toHijri } = require("hijri-date/lib/safe");

const todayHijri = () => {
  const now = new Date();

  const today = toHijri(now);
  if (now.getHours() < 18 && now.getMinutes() < 30) return `${today.getDate() - 1}`;
  return `${today.getDate()}`;
};

module.exports = { todayHijri };
