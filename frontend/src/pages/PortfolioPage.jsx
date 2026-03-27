import { useEffect, useState } from 'react';
import api from '../api/client';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/portfolio');
      setPortfolio(data);
    };
    load();
  }, []);

  if (!portfolio) return <p>Loading portfolio...</p>;

  return (
    <div className="page">
      <h1>Portfolio</h1>
      <div className="grid three">
        <div className="card">
          <h3>Realized P/L</h3>
          <p className={portfolio.realizedPnL >= 0 ? 'green' : 'red'}>₹{portfolio.realizedPnL.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Unrealized P/L</h3>
          <p className={portfolio.unrealizedPnL >= 0 ? 'green' : 'red'}>₹{portfolio.unrealizedPnL.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total P/L</h3>
          <p className={portfolio.totalPnL >= 0 ? 'green' : 'red'}>₹{portfolio.totalPnL.toFixed(2)}</p>
        </div>
      </div>

      <div className="card">
        <h3>Holdings</h3>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Avg Price</th>
              <th>Current Price</th>
              <th>Current Value</th>
              <th>Unrealized P/L</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.holdings.map((h) => (
              <tr key={h.symbol}>
                <td>{h.symbol}</td>
                <td>{h.quantity}</td>
                <td>₹{h.averagePrice.toFixed(2)}</td>
                <td>₹{h.currentPrice.toFixed(2)}</td>
                <td>₹{h.currentValue.toFixed(2)}</td>
                <td className={h.unrealizedPnL >= 0 ? 'green' : 'red'}>₹{h.unrealizedPnL.toFixed(2)}</td>
              </tr>
            ))}
            {portfolio.holdings.length === 0 && (
              <tr>
                <td colSpan="6">No holdings yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioPage;
