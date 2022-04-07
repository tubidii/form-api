const mongoose = require("mongoose")

const hotelContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  }
});

module.exports = mongoose.model("HotelContact", hotelContactSchema);
