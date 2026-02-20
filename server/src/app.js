const express = require("express");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const quranRoute = require("./routes/quran.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/quran", quranRoute);

module.exports = app;
