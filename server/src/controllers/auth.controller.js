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

const verifyEmail = async (req, res) => {
  const token = req.body.token;
  try {
    const user = await User.findOne({
      "emailVerify.token": token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }

    if (user.emailVerify.expiredAt < Date.now()) {
      return res.status(400).json({
        message: "Expired Token",
      });
    }

    user.isVerified = true;
    user.emailVerify.token = "";
    user.emailVerify.expiredAt = Date.now() - 1000;

    const payload = {
      id: user._id,
      email: user.email,
    };

    const accessToken = genAccess(payload);
    const refreshToken = genRefresh(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.refresh.push({ token: refreshToken });

    await user.save();

    res.status(200).json({
      message: "Email verified",
      user: {
        name,
        email,
        profile: user.profile.pic,
      },
    });
  } catch (error) {
    console.log("error on verify email controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(409).json({
        message: "Invalid Cridentials",
      });
    }

    const isSame = await bcryptjs.compare(password, user.password);

    if (!isSame) {
      return res.status(409).json({
        message: "Invalid Cridentials",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "verify email",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const accessToken = genAccess(payload);
    const refreshToken = genRefresh(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.refresh.push({ token: refreshToken });

    await user.save();

    res.status(200).json({
      message: "log in",
      user: {
        name: user.name,
        email: user.email,
        profile: user.profile.pic,
      },
    });
  } catch (error) {
    console.log("error on log in controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logOut = async (req, res) => {
  try {
    const refresh = req.cookies.refreshToken;
    req.user.refresh = req.user.refresh.filter(
      (item) => item.token !== refresh,
    );

    await user.save();

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(204).json({
      message: "Loged out",
    });
  } catch (error) {
    console.log("error on log out controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const resendVerify = async (req, res) => {
  try {
    req.user.emailVerify = {
      token: genOTP(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
      tokenCount: [...this.tokenCount, Date.now()],
    };

    await req.user.save();

    await sendEmail(
      email,
      {
        name: req.user.name,
        token: req.user.emailVerify.token,
      },
      "verify-email",
    );

    res.status(200).json({
      message: "Email sent",
    });
  } catch (error) {
    console.log("error on resendVerify controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const code = genOTP();
  try {
    req.user.forgotPassword = {
      code,
    };

    await req.user.save();

    await sendEmail(
      email,
      {
        name: req.user.name,
        token: req.user.forgotPassword.code,
      },
      "forgot-password",
    );

    res.status(200).json({
      message: "OTP sent",
    });
  } catch (error) {
    console.log("error on forgot password controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { signup, verifyEmail, logIn, logOut, resendVerify,forgotPassword };
