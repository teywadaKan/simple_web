import React from 'react';
import type { User, Post } from '../types';

interface UserDetailProps {
  user: User;
  posts: Post[];
  onBack: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, posts, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <button 
        className="bg-blue-400 hover:bg-blue-600 border-none text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium duration-200 mb-6 sm:mb-8 flex items-center gap-2"
        onClick={onBack}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Users
      </button>
      
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg mb-6 sm:mb-8 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-shrink-0">
            <img 
              src={user.avatar} 
              alt={`${user.name} avatar`}
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border-4 border-gray-200 bg-white shadow-md"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{user.name}</h1>
            <p className="text-lg sm:text-xl text-blue-500 font-medium mb-2">@{user.username}</p>
            <p className="text-base sm:text-lg text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
        <div className="bg-white rounded-xl p-6 shadow-lg animate-slide-up">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Contact Information
          </h3>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Phone:</span> 
              <span className="ml-2">{user.phone}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Website:</span> 
              <span className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer">{user.website}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg animate-slide-up">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Address
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg animate-slide-up md:col-span-2 xl:col-span-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Company
          </h3>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Name:</span> 
              <span className="ml-2">{user.company.name}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Catchphrase:</span> 
              <span className="ml-2 italic">{user.company.catchPhrase}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Business:</span> 
              <span className="ml-2">{user.company.bs}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg animate-slide-up">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Posts ({posts.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors duration-200">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                {post.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-4">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;