import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface UserCardProps {
  user: User;
  onUserClick?: (user: User) => void; // Made optional for backward compatibility
}

const UserCard: React.FC<UserCardProps> = ({ user, onUserClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onUserClick) {
      onUserClick(user);
    } else {
      navigate(`/userdetail/${user.id}`);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 cursor-pointer transition-all duration-300 border border-gray-200 group animate-fade-in"
      onClick={handleClick}
    >
      <div className="flex justify-center mb-4">
        <img 
          src={user.avatar} 
          alt={`${user.name} avatar`}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-200 group-hover:border-blue-300 transition-colors duration-300 bg-white"
        />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
          {user.name}
        </h3>
        <p className="text-blue-500 font-medium text-sm sm:text-base">@{user.username}</p>
        <p className="text-gray-600 text-sm sm:text-base line-clamp-1">{user.email}</p>
        <p className="text-gray-800 font-medium text-sm sm:text-base line-clamp-1">{user.company.name}</p>
        <p className="text-gray-700 text-sm sm:text-base line-clamp-1">{user.address.city}</p>
      </div>
    </div>
  );
};

export default UserCard;