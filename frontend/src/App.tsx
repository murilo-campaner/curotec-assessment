import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostModal from './components/PostModal';
import ConfirmDialog from './components/ConfirmDialog';
import ErrorDisplay from './components/ErrorDisplay';
import ToastContainer from './components/Toast';
import Footer from './components/Footer';
import { usePosts } from './hooks/usePosts';
import { usePostMutations } from './hooks/usePostMutations';
import { usePostModal } from './hooks/usePostModal';
import { useToast } from './hooks/useToast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false, // Don't retry mutations by default
      onError: (error: any) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

function BlogApp() {
  // Custom hooks
  const {
    posts,
    isLoading,
    error,
    searchQuery,
    currentPage,
    activeFilter,
    totalItems,
    totalPages,
    itemsPerPage,
    handleSearchChange,
    handlePageChange,
    handleFilterChange,
  } = usePosts();

  const { toasts, showToast, hideToast } = useToast();

  const {
    handleCreate,
    handleUpdate,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    deleteConfirmation,
    isCreating,
    isUpdating,
  } = usePostMutations({
    onSuccess: (message) => showToast('success', message),
    onError: (message) => showToast('error', message),
  });

  const {
    isModalOpen,
    editingPost,
    handleNewPost,
    handleEditPost,
    closeModal,
    handleModalSubmit,
  } = usePostModal();

  // Combined handlers
  const handleModalSubmitWrapper = (data: any) => {
    handleModalSubmit(data, handleCreate, handleUpdate);
    closeModal();
  };

  if (error) {
    return (
      <AppContainer>
        <div className="py-12">
          <ErrorDisplay
            error={error}
            type="network"
            onRetry={() => window.location.reload()}
            className="max-w-2xl mx-auto"
          />
        </div>
      </AppContainer>
    );
  }

  return (
    <>
      <AppContainer>
        <Header onNewPost={handleNewPost} />

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          className="mb-6"
        />

        <PostList
          posts={posts}
          onEdit={handleEditPost}
          onDelete={handleDeleteClick}
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

        <PostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmitWrapper}
          post={editingPost}
          isLoading={isCreating || isUpdating}
        />

        <ConfirmDialog
          isOpen={deleteConfirmation.isOpen}
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />

        <Footer />
      </AppContainer>

      <ToastContainer
        toasts={toasts}
        onClose={hideToast}
        position="top-right"
      />
    </>
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
