const { configDotenv } = require("dotenv");

configDotenv();

const ENV = {
  PORT: process.env.PORT,
  JWT_ACCESS: process.env.JWT_ACCESS,
  JWT_REFRESH: process.env.JWT_REFRESH,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URL: process.env.MONGODB_URL,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_KEY: process.env.SMTP_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  EMAIL_KEY: process.env.EMAIL_KEY,
};

module.exports = ENV;
