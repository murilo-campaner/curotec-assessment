import React from 'react';
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onNewPost: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewPost }) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Curotec Blog</h1>

      <div className="flex items-center space-x-4">
        <button
          onClick={onNewPost}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Post</span>
        </button>

        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <UserCircleIcon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;
