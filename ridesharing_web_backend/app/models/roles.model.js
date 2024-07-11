const mongoose = require("mongoose");

const roles_schema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("roles", roles_schema);
