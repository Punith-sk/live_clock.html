import { useEffect, useState } from 'react';
import api from '../api/client';

const TradingPage = () => {
  const [form, setForm] = useState({ symbol: 'RELIANCE', quantity: 1, type: 'buy' });
  const [trades, setTrades] = useState([]);
  const [message, setMessage] = useState('');

  const loadTrades = async () => {
    const { data } = await api.get('/trades');
    setTrades(data);
  };

  useEffect(() => {
    loadTrades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await api.post('/trades', { ...form, quantity: Number(form.quantity) });
      setMessage(`Trade ${data.trade.status}: ${data.trade.type.toUpperCase()} ${data.trade.quantity} ${data.trade.symbol} @ ₹${data.trade.price}`);
      loadTrades();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Trade failed');
    }
  };

  return (
    <div className="page">
      <h1>Trading</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="grid three">
          <input
            type="text"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
            placeholder="Symbol"
            required
          />
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <button type="submit">Place Trade</button>
        {message && <p>{message}</p>}
      </form>

      <div className="card">
        <h3>Trade History</h3>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade._id}>
                <td>{new Date(trade.createdAt).toLocaleString()}</td>
                <td>{trade.symbol}</td>
                <td>{trade.type}</td>
                <td>{trade.quantity}</td>
                <td>₹{trade.price}</td>
                <td>{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingPage;
