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
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts', 'all']);

      // Optimistically update to the new value
      queryClient.setQueryData(['posts', 'all'], (old: any) => {
        const optimisticPost = {
          ...newPost,
          id: Date.now(), // Temporary ID
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return [optimisticPost, ...(old || [])];
      });

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onError: (err, _newPost, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts', 'all'], context.previousPosts);
      }
      onError?.(err.message || 'Failed to create post');
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSuccess: () => {
      onSuccess?.('Post created successfully');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
      postsApi.updatePost(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts', 'all']);

      // Optimistically update to the new value
      queryClient.setQueryData(['posts', 'all'], (old: any) => {
        return old?.map((post: any) =>
          post.id === id ? { ...post, ...data, updatedAt: new Date().toISOString() } : post
        );
      });

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onError: (err, _variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts', 'all'], context.previousPosts);
      }
      onError?.(err.message || 'Failed to update post');
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSuccess: () => {
      onSuccess?.('Post updated successfully');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: postsApi.deletePost,
    onMutate: async (postId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts', 'all']);

      // Optimistically update to the new value
      queryClient.setQueryData(['posts', 'all'], (old: any) => {
        return old?.filter((post: any) => post.id !== postId);
      });

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onError: (err, _postId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts', 'all'], context.previousPosts);
      }
      onError?.(err.message || 'Failed to delete post');
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSuccess: () => {
      onSuccess?.('Post deleted successfully');
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
