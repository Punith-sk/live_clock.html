const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);

module.exports = router;
