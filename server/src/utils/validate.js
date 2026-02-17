const emailValidator = (email) => {
  const re = /[^\s@]+@[^\s@]+\.[a-zA-z0-9]{2,}$/;
  return re.test(email);
};

const khitamValidator = (khitam) => {
  const num = Number(khitam);
  if (!num) return null;

  const result = num <= 1 ? 1 : num >= 60 ? 60 : Math.floor(num);
  return result;
};

const terawihValidator = (terawih) => {
  const num = Number(terawih);
  if (!num) return null;

  const result = num <= 1 ? 1 : num >= 30 ? 30 : Math.floor(num);
  return result;
};

const khitamCalculator = (khitam) => {
  const totalPages = khitam * 604;
  const khitamPerDay = Math.round(totalPages / 29);

  return khitamPerDay;
};

module.exports = {
  emailValidator,
  khitamValidator,
  terawihValidator,
  khitamCalculator,
};
