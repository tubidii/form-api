const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: false
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const invoiceSchema = new mongoose.Schema({
  isPaid: {
    type: Boolean,
    required: false,
    default: false
  },
  isCash: {
    type: Boolean,
    required: false,
    default: false
  },
  mpesaCode: {
    type: String,
    required: false
  },
  items: [invoiceItemSchema]
});

module.exports = mongoose.model("invoice", invoiceSchema);

