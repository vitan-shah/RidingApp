const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  can_drive: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
  },
  role_id: {
    type: Number,
  },
  current_location: {
    type: {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  },
  created_at: {
    type: Date,
    default: new Date().now,
  },
});

module.exports = mongoose.model("users", userSchema);
