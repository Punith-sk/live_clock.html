const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const { getDummyPrice } = require('../utils/dummyPrices');

const getPortfolio = async (req, res) => {
  try {
    const [portfolio, user] = await Promise.all([
      Portfolio.findOne({ user: req.user._id }),
      User.findById(req.user._id).select('balance'),
    ]);

    const holdingsWithMarket = portfolio.holdings.map((h) => {
      const currentPrice = getDummyPrice(h.symbol);
      const invested = h.averagePrice * h.quantity;
      const currentValue = currentPrice * h.quantity;
      const unrealizedPnL = currentValue - invested;

      return {
        symbol: h.symbol,
        quantity: h.quantity,
        averagePrice: h.averagePrice,
        currentPrice,
        invested,
        currentValue,
        unrealizedPnL,
      };
    });

    const totalInvested = holdingsWithMarket.reduce((sum, item) => sum + item.invested, 0);
    const totalCurrentValue = holdingsWithMarket.reduce((sum, item) => sum + item.currentValue, 0);
    const unrealizedPnL = totalCurrentValue - totalInvested;
    const totalPnL = unrealizedPnL + portfolio.realizedPnL;

    return res.status(200).json({
      balance: user.balance,
      holdings: holdingsWithMarket,
      realizedPnL: portfolio.realizedPnL,
      unrealizedPnL,
      totalPnL,
      totalInvested,
      totalCurrentValue,
      netWorth: user.balance + totalCurrentValue,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPortfolio,
};
