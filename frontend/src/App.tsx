import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PostList } from './components/PostList';
import { PostForm } from './components/PostForm';
import { PostView } from './components/PostView';
import type { Post } from './types/post';

// Criar cliente do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
    },
  },
});

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setShowView(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleCloseView = () => {
    setShowView(false);
    setSelectedPost(null);
  };

  const handleEditFromView = () => {
    if (selectedPost) {
      setEditingPost(selectedPost);
      setShowView(false);
      setShowForm(true);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Curotec Posts</h1>
                <p className="text-gray-600">Gerenciamento de posts</p>
              </div>
              <button
                onClick={handleCreatePost}
                className="btn-primary flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Novo Post
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PostList
            onEditPost={handleEditPost}
            onViewPost={handleViewPost}
          />
        </main>

        {/* Modals */}
        {showForm && (
          <PostForm
            post={editingPost || undefined}
            onClose={handleCloseForm}
          />
        )}

        {showView && selectedPost && (
          <PostView
            post={selectedPost}
            onClose={handleCloseView}
            onEdit={handleEditFromView}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
