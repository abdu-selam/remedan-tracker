const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    initiated: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      pic: {
        type: String,
        default: "",
      },
      picId: {
        type: String,
        default: "",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerify: {
      token: {
        type: String,
        default: "",
      },
      expiredAt: Date,
      tokenCount: [Date],
    },
    refresh: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    forgotPassword: {
      code: String,
      validTo: {
        type: Date,
        default: () => Date.now() + 25 * 60 * 1000,
      },
      created: Date,
    },
    password: String,
    ibada: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
