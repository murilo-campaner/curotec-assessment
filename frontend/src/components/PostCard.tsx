import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="border-b border-gray-200 py-6 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-3 leading-relaxed">
            {truncateContent(post.content)}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{formatDate(post.createdAt)}</span>
            {post.published ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Published
              </span>
            ) : (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                Draft
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(post)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
            title="Edit post"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
            title="Delete post"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
