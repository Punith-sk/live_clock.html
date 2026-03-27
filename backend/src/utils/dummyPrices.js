const DUMMY_PRICES = {
  RELIANCE: 2900,
  TCS: 3850,
  INFY: 1600,
  HDFCBANK: 1725,
  ICICIBANK: 1080,
  SBIN: 780,
  WIPRO: 510,
  ADANIENT: 3150,
  ITC: 445,
  LT: 3650,
};

const getDummyPrice = (symbol) => {
  const normalized = symbol.toUpperCase();
  return DUMMY_PRICES[normalized] || 1000;
};

module.exports = {
  getDummyPrice,
  DUMMY_PRICES,
};
