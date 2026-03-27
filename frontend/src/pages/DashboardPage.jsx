import { useEffect, useState } from 'react';
import api from '../api/client';

const DashboardPage = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/portfolio');
      setPortfolio(data);
    };
    load();
  }, []);

  if (!portfolio) return <p>Loading dashboard...</p>;

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="grid two">
        <div className="card">
          <h3>Available Balance</h3>
          <p>₹{portfolio.balance.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Net Worth</h3>
          <p>₹{portfolio.netWorth.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total P/L</h3>
          <p className={portfolio.totalPnL >= 0 ? 'green' : 'red'}>
            ₹{portfolio.totalPnL.toFixed(2)}
          </p>
        </div>
        <div className="card">
          <h3>Open Positions</h3>
          <p>{portfolio.holdings.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
