const jwt = require("jsonwebtoken");

const ENV = require("./env");

// OTP generator
const genOTP = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};

// access token generator
const genAccess = (payload) => {
  return jwt.sign(payload, ENV.JWT_ACCESS, {
    expiresIn: "15m",
  });
};

// refresh token generator
const genRefresh = (payload) => {
  return jwt.sign(payload, ENV.JWT_REFRESH, {
    expiresIn: "7d",
  });
};

// verify access token
const verifyAccess = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_ACCESS);
  } catch (error) {
    return null;
  }
};

// verify refresh token
const verifyRefresh = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_REFRESH);
  } catch (error) {
    return null;
  }
};

module.exports = { genAccess, genRefresh, genOTP, verifyAccess, verifyRefresh };
