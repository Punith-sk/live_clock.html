const Portfolio = require('../models/Portfolio');
const Trade = require('../models/Trade');
const User = require('../models/User');
const { getDummyPrice } = require('../utils/dummyPrices');

const getTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(trades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const placeTrade = async (req, res) => {
  try {
    const { symbol, quantity, type } = req.body;

    if (!symbol || !quantity || !type) {
      return res.status(400).json({ message: 'symbol, quantity, and type are required' });
    }

    const normalizedSymbol = symbol.toUpperCase();
    const parsedQty = Number(quantity);

    if (!Number.isInteger(parsedQty) || parsedQty <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    if (!['buy', 'sell'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either buy or sell' });
    }

    const price = getDummyPrice(normalizedSymbol);
    const tradeValue = price * parsedQty;

    const user = await User.findById(req.user._id);
    const portfolio = await Portfolio.findOne({ user: req.user._id });

    let status = 'executed';

    const holdings = portfolio.holdings || [];
    const holdingIndex = holdings.findIndex((h) => h.symbol === normalizedSymbol);

    if (type === 'buy') {
      if (user.balance < tradeValue) {
        status = 'rejected';
      } else {
        user.balance -= tradeValue;

        if (holdingIndex === -1) {
          holdings.push({ symbol: normalizedSymbol, quantity: parsedQty, averagePrice: price });
        } else {
          const existing = holdings[holdingIndex];
          const totalQty = existing.quantity + parsedQty;
          const totalCost = existing.averagePrice * existing.quantity + price * parsedQty;
          existing.quantity = totalQty;
          existing.averagePrice = totalCost / totalQty;
        }
      }
    }

    if (type === 'sell') {
      if (holdingIndex === -1 || holdings[holdingIndex].quantity < parsedQty) {
        status = 'rejected';
      } else {
        const existing = holdings[holdingIndex];
        user.balance += tradeValue;

        const pnl = (price - existing.averagePrice) * parsedQty;
        portfolio.realizedPnL += pnl;

        existing.quantity -= parsedQty;
        if (existing.quantity === 0) {
          holdings.splice(holdingIndex, 1);
        }
      }
    }

    const trade = await Trade.create({
      user: req.user._id,
      symbol: normalizedSymbol,
      quantity: parsedQty,
      type,
      price,
      status,
    });

    portfolio.holdings = holdings;
    await portfolio.save();
    await user.save();

    return res.status(201).json({
      trade,
      balance: user.balance,
      holdings: portfolio.holdings,
      realizedPnL: portfolio.realizedPnL,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTrades,
  placeTrade,
};
