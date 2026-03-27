const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    averagePrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    holdings: {
      type: [holdingSchema],
      default: [],
    },
    realizedPnL: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
