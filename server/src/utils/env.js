const { configDotenv } = require("dotenv");

configDotenv();

const ENV = {
  PORT: process.env.PORT,
  JWT_ACCESS: process.env.JWT_ACCESS,
  JWT_REFRESH: process.env.JWT_REFRESH,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URL: process.env.MONGODB_URL,
};

module.exports = ENV;
