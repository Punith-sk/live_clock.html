# TradersHub (MVP)

TradersHub is a full-stack paper trading app with social posting.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend**: React + Vite, Axios, React Router

## Project Structure

```
tradershub/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── leaderboardController.js
│       │   ├── portfolioController.js
│       │   ├── postController.js
│       │   └── tradeController.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Trade.js
│       │   ├── Portfolio.js
│       │   └── Post.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── tradeRoutes.js
│       │   ├── portfolioRoutes.js
│       │   ├── leaderboardRoutes.js
│       │   └── postRoutes.js
│       └── utils/
│           └── dummyPrices.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── api/
│       │   └── client.js
│       ├── components/
│       │   ├── NavBar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       └── pages/
│           ├── LoginPage.jsx
│           ├── SignupPage.jsx
│           ├── DashboardPage.jsx
│           ├── TradingPage.jsx
│           ├── PortfolioPage.jsx
│           ├── LeaderboardPage.jsx
│           └── CommunityPage.jsx
└── README.md
```

## Setup Instructions

### 1) Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB URL and JWT secret.

Run backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

### 2) Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## API Routes
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/trades` (protected)
- `POST /api/trades` (protected)
- `GET /api/portfolio` (protected)
- `GET /api/leaderboard`
- `GET /api/posts`
- `POST /api/posts` (protected)

## MVP Features Delivered
- JWT authentication (signup/login)
- User virtual balance (₹100000 start)
- Buy/sell paper trades with dummy prices
- Portfolio with holdings and P/L
- Leaderboard by profit %
- Community feed with post creation and feed view
