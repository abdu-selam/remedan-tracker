const express = require("express");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const quranRoute = require("./routes/quran.route");
const terawihRoute = require("./routes/terawih.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/quran", quranRoute);
app.use("/terawih", terawihRoute);

module.exports = app;
