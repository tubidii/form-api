const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: Map,
    of: Number
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);

