import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../services/postsApi';
import type { CreatePostData, UpdatePostData } from '../types/post';

export interface DeleteConfirmation {
  isOpen: boolean;
  postId: number | null;
}

export const usePostMutations = () => {
  const queryClient = useQueryClient();

  // Create mutation
  const createMutation = useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
      postsApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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
