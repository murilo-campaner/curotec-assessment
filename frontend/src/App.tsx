import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { usePosts } from './hooks/usePosts';
import { usePostMutations } from './hooks/usePostMutations';
import { usePostModal } from './hooks/usePostModal';

const queryClient = new QueryClient();

function BlogApp() {
  // Custom hooks
  const {
    posts,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalItems,
    totalPages,
    itemsPerPage,
    handleSearchChange,
    handlePageChange,
  } = usePosts();

  const {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating,
    isUpdating,
  } = usePostMutations();

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
        posts={posts}
        onEdit={handleEditPost}
        onDelete={handleDelete}
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
        onClose={closeModal}
        onSubmit={handleModalSubmitWrapper}
        post={editingPost}
        isLoading={isCreating || isUpdating}
      />

      <Footer />
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
