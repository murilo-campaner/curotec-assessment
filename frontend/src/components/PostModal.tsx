import React from 'react';
import Modal from './Modal';
import PostForm from './PostForm';
import type { Post, CreatePostData, UpdatePostData } from '../types/post';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePostData | UpdatePostData) => void;
  post?: Post | null;
  isLoading?: boolean;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  post,
  isLoading = false
}) => {
  const isEditing = !!post;
  const title = isEditing ? 'Edit Post' : 'New Post';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <PostForm
        post={post}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default PostModal;
