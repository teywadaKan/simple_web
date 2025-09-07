import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { User, Post } from '../types';
import { fetchUsers, fetchUserPosts } from '../api';
import UserDetail from '../components/UserDetail';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadUserData(parseInt(id));
    } else {
      setError('Invalid user ID');
      setLoading(false);
    }
  }, [id]);

  const loadUserData = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);

      // Load all users to find the specific user
      const usersData = await fetchUsers();
      const foundUser = usersData.find((u: User) => u.id === userId);
      
      if (!foundUser) {
        setError('User not found');
        setLoading(false);
        return;
      }

      setUser(foundUser);
      
      // Load user posts
      const userPosts = await fetchUserPosts(userId);
      setPosts(userPosts);
    } catch (err) {
      setError('Failed to load user data. Make sure the backend server is running on port 3001.');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToUsers = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="text-white text-lg sm:text-xl md:text-2xl font-medium animate-pulse">
          Loading user details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="text-white text-center max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Error</h2>
          <p className="text-base sm:text-lg mb-6 leading-relaxed opacity-90">{error}</p>
          <button 
            onClick={handleBackToUsers} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="text-white text-center max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">User Not Found</h2>
          <p className="text-base sm:text-lg mb-6 leading-relaxed opacity-90">
            The user you're looking for doesn't exist.
          </p>
          <button 
            onClick={handleBackToUsers} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 lg:p-8">
      <UserDetail 
        user={user} 
        posts={posts} 
        onBack={handleBackToUsers} 
      />
    </div>
  );
};

export default UserDetailPage;