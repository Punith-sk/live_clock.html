import { useEffect, useState } from 'react';
import api from '../api/client';

const LeaderboardPage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/leaderboard');
      setRows(data);
    };
    load();
  }, []);

  return (
    <div className="page">
      <h1>Leaderboard</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Email</th>
              <th>Net Worth</th>
              <th>Profit</th>
              <th>Profit %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.userId}>
                <td>{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>₹{row.netWorth.toFixed(2)}</td>
                <td className={row.profit >= 0 ? 'green' : 'red'}>₹{row.profit.toFixed(2)}</td>
                <td className={row.profitPercent >= 0 ? 'green' : 'red'}>{row.profitPercent.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
