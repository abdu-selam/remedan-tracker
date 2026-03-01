const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const quranRoute = require("./routes/quran.route");
const terawihRoute = require("./routes/terawih.route");
const zhikrRoute = require("./routes/zhikr.route");
const ENV = require("./utils/env");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/quran", quranRoute);
app.use("/terawih", terawihRoute);
app.use("/zhikr", zhikrRoute);

module.exports = app;
