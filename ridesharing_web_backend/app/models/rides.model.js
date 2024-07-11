const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  driver_id: {
    type: mongoose.Types.ObjectId,
  },
  passenger_id: {
    type: mongoose.Types.ObjectId,
  },
  current_status: {
    type: String,
  },
  starting_location: {
    type: {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  },
  ending_location: {
    type: {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  },
  fare: {
    type: Number,
  },
});

module.exports = mongoose.model("Rides", ridesSchema);
