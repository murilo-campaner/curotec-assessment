import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../services/postsApi';
import type { CreatePostData, UpdatePostData } from '../types/post';

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

  // Handlers
  const handleCreate = (data: CreatePostData) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (id: number, data: UpdatePostData) => {
    updateMutation.mutate({ id, data });
  };

  const handleDelete = (postId: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(postId);
    }
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

    // Handlers
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
