import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <h2>TradersHub</h2>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/trading">Trading</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/community">Community</Link>
      </div>
      <div className="nav-user">
        <span>{user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
