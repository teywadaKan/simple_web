const API_BASE_URL = 'http://localhost:3001/api';

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const fetchUser = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const fetchUserPosts = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  return response.json();
};