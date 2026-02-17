const { verifyAccess } = require("../utils/token");
const User = require("../models/User");

// protected route to check authorization of the user
const protected = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Token missed",
      });
    }

    const user = verifyAccess(token);
    if (!user) {
      return res.status(409).json({
        message: "Invalid Token",
      });
    }

    req.user = await User.findById(user.id);
    next();
  } catch (error) {
    console.log("Error on protected route", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const tokenCount = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      message: "Email required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        message: "Invalid cridentials",
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        message: "Email Verified",
      });
    }

    const tokens = user.emailVerify.tokenCount;

    if (tokens.length == 6) {
      const today = Date.now();
      const oneDay = 1000 * 60 * 60 * 24;

      if (today - tokens[0] < oneDay) {
        return res.status(429).json({
          message: "Today's limit reached",
        });
      }

      const tokenToAdd =
        today - tokens[5] > oneDay
          ? []
          : today - tokens[4] > oneDay
            ? [tokens[5]]
            : today - tokens[3] > oneDay
              ? [tokens[4], tokens[5]]
              : today - tokens[2] > oneDay
                ? [tokens[3], tokens[4], tokens[5]]
                : today - tokens[1] > oneDay
                  ? [tokens[2], tokens[3], tokens[4], tokens[5]]
                  : [tokens[1], tokens[2], tokens[3], tokens[4], tokens[5]];

      user.emailVerify.tokenCount = tokenToAdd;
      await user.save();
    }
    res.user = user;
    next();
  } catch (error) {
    console.log("Error in token count middleware", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { protected, tokenCount };
