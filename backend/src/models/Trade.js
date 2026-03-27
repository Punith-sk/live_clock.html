const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ['buy', 'sell'],
      required: true,
    },
    status: {
      type: String,
      enum: ['executed', 'rejected'],
      default: 'executed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trade', tradeSchema);
