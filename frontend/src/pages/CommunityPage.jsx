import { useEffect, useState } from 'react';
import api from '../api/client';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const loadPosts = async () => {
    const { data } = await api.get('/posts');
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await api.post('/posts', { content });
    setContent('');
    loadPosts();
  };

  return (
    <div className="page">
      <h1>Community Feed</h1>
      <form className="card" onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={content}
          placeholder="Share your market thoughts..."
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <div className="feed">
        {posts.map((post) => (
          <div className="card" key={post._id}>
            <div className="post-head">
              <strong>{post.user?.name}</strong>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
