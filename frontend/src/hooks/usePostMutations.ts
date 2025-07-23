import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../services/postsApi';
import type { CreatePostData, UpdatePostData } from '../types/post';

export interface DeleteConfirmation {
  isOpen: boolean;
  postId: number | null;
}

export interface UsePostMutationsOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const usePostMutations = (options: UsePostMutationsOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.('Post created successfully');
    },
    onError: (error) => {
      onError?.(error.message || 'Failed to create post');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
      postsApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.('Post updated successfully');
    },
    onError: (error) => {
      onError?.(error.message || 'Failed to update post');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.('Post deleted successfully');
    },
    onError: (error) => {
      onError?.(error.message || 'Failed to delete post');
    },
  });

  // Delete confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>({
    isOpen: false,
    postId: null,
  });

  // Handlers
  const handleCreate = (data: CreatePostData) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (id: number, data: UpdatePostData) => {
    updateMutation.mutate({ id, data });
  };

  const handleDeleteClick = (postId: number) => {
    setDeleteConfirmation({ isOpen: true, postId });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.postId) {
      deleteMutation.mutate(deleteConfirmation.postId);
      setDeleteConfirmation({ isOpen: false, postId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, postId: null });
  };

    return {
    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,

    // Loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isAnyLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,

    // Delete confirmation
    deleteConfirmation,

    // Handlers
    handleCreate,
    handleUpdate,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};
