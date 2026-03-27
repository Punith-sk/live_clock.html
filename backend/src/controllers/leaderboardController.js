const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const { getDummyPrice } = require('../utils/dummyPrices');

const STARTING_BALANCE = 100000;

const getLeaderboard = async (_req, res) => {
  try {
    const users = await User.find().select('name email balance');
    const portfolios = await Portfolio.find();

    const portfolioMap = new Map(portfolios.map((p) => [String(p.user), p]));

    const leaderboard = users
      .map((user) => {
        const portfolio = portfolioMap.get(String(user._id));
        const holdings = portfolio?.holdings || [];

        const holdingsValue = holdings.reduce((sum, h) => sum + getDummyPrice(h.symbol) * h.quantity, 0);
        const netWorth = user.balance + holdingsValue;
        const profit = netWorth - STARTING_BALANCE;
        const profitPercent = (profit / STARTING_BALANCE) * 100;

        return {
          userId: user._id,
          name: user.name,
          email: user.email,
          netWorth,
          profit,
          profitPercent,
        };
      })
      .sort((a, b) => b.profitPercent - a.profitPercent)
      .map((item, idx) => ({ rank: idx + 1, ...item }));

    return res.status(200).json(leaderboard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeaderboard,
};
