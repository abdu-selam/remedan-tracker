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

module.exports = { protected };
