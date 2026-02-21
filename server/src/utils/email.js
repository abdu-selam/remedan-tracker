const transporter = require("../config/email.config");
const { verifyEmail } = require("./emailTemplate");

const sendEmail = async (to, message, type) => {
  let html = "";
  let text = "";
  if (type == "verify-email") {
    html += verifyEmail(message);
    text += `verify your email OTP ${message.token}`;
  }

  const val = await transporter.sendMail({
    from: "Abidin <abidinremedanplanner@gmail.com>",
    to,
    subject: "Welcome 🎉",
    text: "email verification mail",
    html: verifyEmail(message),
  });

  console.log(val);
};

module.exports = sendEmail;
