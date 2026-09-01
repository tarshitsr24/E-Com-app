const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 21,
    },
    email: {
      type: String,
      required: true,
      index: true, // unique : true
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 16,
    },
    phone: {
      type: String,
      match: /^[6-9]\d{9}$/,
      default: user,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "seller", "motilalOswal"],
      default: "user",
    },
    avatar: {
      url: String,
      publicId: { type: String, trim: true },
    },
    addresses: [
      {
        label: String,
        fullname: { String, maxLength: 21 },
        phone: { String, maxlength: 10 },
        street: String,
        city: String,
        state: String,
        pincode: { String, maxLength: 6 },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
