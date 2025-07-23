import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import { postsApi } from './services/postsApi';
import type { Post, CreatePostData, UpdatePostData } from './types/post';

const queryClient = new QueryClient();

function BlogApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [publishedFilter, setPublishedFilter] = useState<boolean | undefined>(undefined);

  const queryClientInstance = useQueryClient();
  const itemsPerPage = 10;

  // Query to fetch posts
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', searchQuery, publishedFilter, currentPage],
    queryFn: () => postsApi.getAllPosts(),
  });

  // Filter posts based on search and publication filter
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPublished = publishedFilter === undefined || post.published === publishedFilter;

    return matchesSearch && matchesPublished;
  });

  // Pagination
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  // Mutations
  const createMutation = useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['posts'] });
      setIsModalOpen(false);
      setEditingPost(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
      postsApi.updatePost(id, data),
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['posts'] });
      setIsModalOpen(false);
      setEditingPost(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Handlers
  const handleNewPost = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDeletePost = (postId: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(postId);
    }
  };

  const handleModalSubmit = (data: CreatePostData | UpdatePostData) => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: data as UpdatePostData });
    } else {
      createMutation.mutate(data as CreatePostData);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (error) {
    return (
      <AppContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading posts</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header onNewPost={handleNewPost} />

      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <PostList
        posts={paginatedPosts}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
        isLoading={isLoading}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(null);
        }}
        onSubmit={handleModalSubmit}
        post={editingPost}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </AppContainer>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogApp />
    </QueryClientProvider>
  );
}

export default App;
