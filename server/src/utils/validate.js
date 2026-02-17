const emailValidator = (email) => {
  const re = /[^\s@]+@[^\s@]+\.[a-zA-z0-9]{2,}$/;
  return re.test(email);
};

module.exports = { emailValidator };
