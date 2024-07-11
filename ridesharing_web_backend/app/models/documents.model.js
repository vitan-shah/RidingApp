const mongoose = require("mongoose");

const document_schema = new mongoose.Schema({
  dl_img: {
    type: String,
    required: true,
  },
  rc_no: {
    type: String,
    required: true,
  },
  rc_img: {
    type: String,
    required: true,
  },
  is_document_verified: {
    type: Boolean,
    required: false,
  },
  dl_no: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    require: true,
  },
  reg_no: {
    type: String,
    require: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("documents", document_schema);
