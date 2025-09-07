import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { fetchUsers } from '../api';
import UserCard from '../components/UserCard';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (err) {
      setError('Failed to load users. Make sure the backend server is running on port 3001.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
        <div className="text-white text-lg sm:text-xl md:text-2xl font-medium animate-pulse">
          Loading users...
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
            onClick={loadUsers} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-500 to-pink-500 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg animate-fade-in">
            User Directory
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white opacity-90 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Click on any user to view their details and posts
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-slide-up">
          {users.map((user) => (
            <UserCard 
              key={user.id} 
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;