const mongoose = require("mongoose");

const Payment_method_schema = new mongoose.Schema({
  payment_method: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("payment_methods", Payment_method_schema);
