const express = require('express');
const { getTrades, placeTrade } = require('../controllers/tradeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getTrades);
router.post('/', placeTrade);

module.exports = router;
