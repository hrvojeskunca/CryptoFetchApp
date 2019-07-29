const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  btc: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    market: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    openDay: {
      type: Number,
      required: true,
      trim: true,
    },
    highDay: {
      type: Number,
      required: true,
      trim: true,
    },
    lowDay: {
      type: Number,
      required: true,
      trim: true,
    },
    marketCap: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  eth: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    market: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    openDay: {
      type: Number,
      required: true,
      trim: true,
    },
    highDay: {
      type: Number,
      required: true,
      trim: true,
    },
    lowDay: {
      type: Number,
      required: true,
      trim: true,
    },
    marketCap: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  bch: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    market: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    openDay: {
      type: Number,
      required: true,
      trim: true,
    },
    highDay: {
      type: Number,
      required: true,
      trim: true,
    },
    lowDay: {
      type: Number,
      required: true,
      trim: true,
    },
    marketCap: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
}, {
  timestamps: true,
});

const Data = mongoose.model('btc-eth-bch data', dataSchema);

module.exports = Data;
