const mongoose = require("mongoose");

const currentStatus_schema = new mongoose.Schema({
  current_status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("current_status", currentStatus_schema);
