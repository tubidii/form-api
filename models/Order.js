const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fileLocation: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  hotelContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HotelContact',
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
