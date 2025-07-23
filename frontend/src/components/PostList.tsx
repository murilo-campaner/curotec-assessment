import React from 'react';
import PostCard from './PostCard';
import type { Post } from '../types/post';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  isLoading?: boolean;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>
        <div className="animate-pulse space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border-b border-gray-200 py-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>
        <div className="text-gray-500">
          <p className="text-lg mb-2">No posts found</p>
          <p className="text-sm">Create your first post by clicking "New Post"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>
      <div className="space-y-0">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
