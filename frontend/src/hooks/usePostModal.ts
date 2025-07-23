import { useState } from 'react';
import type { Post, CreatePostData, UpdatePostData } from '../types/post';

export const usePostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Handlers
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const setEditingPostHandler = (post: Post | null) => {
    setEditingPost(post);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (
    data: CreatePostData | UpdatePostData,
    onCreate: (data: CreatePostData) => void,
    onUpdate: (id: number, data: UpdatePostData) => void
  ) => {
    if (editingPost) {
      onUpdate(editingPost.id, data as UpdatePostData);
    } else {
      onCreate(data as CreatePostData);
    }
  };

  return {
    // State
    isModalOpen,
    editingPost,

    // Handlers
    openModal,
    closeModal,
    setEditingPost: setEditingPostHandler,
    handleNewPost,
    handleEditPost,
    handleModalSubmit,
  };
};
