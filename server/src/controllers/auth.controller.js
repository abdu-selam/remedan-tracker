const { emailValidator } = require("../utils/validate");
const User = require("../models/User");
const bcryptjs = require("bcrypt");
const { genOTP } = require("../utils/token");
const sendEmail = require("../utils/email");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Incomplete Field",
    });
  }

  if (!emailValidator(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  try {
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      return res.status(409).json({
        message: "User existed",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      emailVerify: {
        token: genOTP(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000,
        tokenCount: [Date.now()],
      },
    });

    await user.save();

    await sendEmail(
      email,
      {
        name,
        token: user.emailVerify.token,
      },
      "verify-email",
    );

    res.status(201).json({
      message: "User created",
      name,
    });
  } catch (error) {
    console.log("error on sign up controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { signup };
