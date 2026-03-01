const transporter = require("../config/email.config");
const { verifyEmail, forgotEmail } = require("./emailTemplate");

// const sendEmail = async (to, message, type) => {
//   if (type == "verify-email") {
// //     const text = `Assalamu Alaikum wa Rahmatullahi wa Barakatuh,
// // Thank you for registering with Abidin Tracker.

// // Please verify your email address using the code below:

// // ${message.token}

// // This code will expire in 12 hours. If it expires, you may request a new verification link from the login page.

// // If you did not create this account, please ignore this email.

// // We will never ask for your password via email.

// // Abidin Tracker Team`;
//     await transporter.sendMail({
//       from: "Abidin <abidinremedanplanner@gmail.com>",
//       to,
//       subject: "Verify your email for Abidin Tracker",
//       text,
//       html: verifyEmail(message),
//     });
//   } else if (type == "forgot-password") {
// //     const text = `Assalamu Alaikum wa Rahmatullahi wa Barakatuh,

// // We received a request to reset the password for your Abidin Tracker account.

// // To choose a new password, use the code below:

// // ${message.token}

// // If you did not request a password reset, please ignore this email. Your account will remain secure.

// // We will never ask for your password or personal information through email.

// // Abidin Tracker Team`;
//     await transporter.sendMail({
//       from: "Abidin <abidinremedanplanner@gmail.com>",
//       to,
//       subject: "Reset your password for Abidin Tracker",
//       text,
//       html: forgotEmail(message),
//     });
//   }
// };

const sendEmail = async (to, message, type) => {
  try {
    const response = await transporter.sendTransacEmail({
      sender: {
        email: "abidinremedanplanner@gmail.com",
        name: "Abidin Remedan Tracker",
      },
      to: [{ email: to }],
      subject:
        type == "verify-email"
          ? "Verify your email for Abidin Tracker"
          : "Reset your password for Abidin Tracker",
      htmlContent:
        type == "verify-email" ? verifyEmail(message) : forgotEmail(message),
    });

    return response;
  } catch (error) {
    console.error("Brevo Email Error:", error.response?.body || error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
