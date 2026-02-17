const mongoose = require("mongoose");

const ENV = require("../utils/env");

const connectDB = async () => {
  try {
    console.log(ENV.MONGODB_URL)
    const mongodb = await mongoose.connect(ENV.MONGODB_URL);
    console.log(`mongobd connected successfully`);
  } catch (error) {
    console.log("error on connect db ", error);
    process.exit(1); 
  } 
};

module.exports = connectDB;
