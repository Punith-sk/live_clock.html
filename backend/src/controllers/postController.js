const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    const post = await Post.create({
      user: req.user._id,
      content: content.trim(),
    });

    const populated = await post.populate('user', 'name email');

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPosts = async (_req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
};
