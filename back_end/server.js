import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base URLs for external APIs
const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com';
const AVATAR_API = 'https://api.dicebear.com/7.x/avataaars/svg';

// Routes

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${JSONPLACEHOLDER_API}/users`);
    const users = response.data.map(user => ({
      ...user,
      avatar: `${AVATAR_API}?seed=${user.username}&backgroundColor=b6e3f4,c0aede,d1d4f9`
    }));
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get specific user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JSONPLACEHOLDER_API}/users/${id}`);
    const user = {
      ...response.data,
      avatar: `${AVATAR_API}?seed=${response.data.username}&backgroundColor=b6e3f4,c0aede,d1d4f9`
    };
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
});

// Get user posts
app.get('/api/users/:id/posts', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JSONPLACEHOLDER_API}/users/${id}/posts`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints available at:`);
  console.log(`   - GET /api/users - Get all users`);
  console.log(`   - GET /api/users/:id - Get specific user`);
  console.log(`   - GET /api/users/:id/posts - Get user posts`);
  console.log(`   - GET /health - Health check`);
});