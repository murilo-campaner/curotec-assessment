import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon, PencilIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { postsApi } from '../services/postsApi';
import type { Post } from '../types/post';

interface PostListProps {
  onEditPost: (post: Post) => void;
  onViewPost: (post: Post) => void;
}

export function PostList({ onEditPost, onViewPost }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [publishedFilter, setPublishedFilter] = useState<boolean | undefined>(undefined);
  const queryClient = useQueryClient();

  // Query para buscar posts
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', searchQuery, publishedFilter],
    queryFn: () => postsApi.getAllPosts(),
  });

  // Mutation para deletar post
  const deleteMutation = useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Filtrar posts baseado na busca e filtro de publicação
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPublished = publishedFilter === undefined || post.published === publishedFilter;

    return matchesSearch && matchesPublished;
  });

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar posts: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
        </div>
        <select
          value={publishedFilter === undefined ? '' : publishedFilter.toString()}
          onChange={(e) => setPublishedFilter(e.target.value === '' ? undefined : e.target.value === 'true')}
          className="input-field sm:w-48"
        >
          <option value="">Todos os posts</option>
          <option value="true">Publicados</option>
          <option value="false">Rascunhos</option>
        </select>
      </div>

      {/* Lista de posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum post encontrado.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    {post.published ? (
                      <EyeIcon className="h-4 w-4 text-green-600" title="Publicado" />
                    ) : (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" title="Rascunho" />
                    )}
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-3">
                    {post.content.length > 150
                      ? `${post.content.substring(0, 150)}...`
                      : post.content
                    }
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Criado em: {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                    <span>Atualizado em: {new Date(post.updatedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onViewPost(post)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                    title="Visualizar"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEditPost(post)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                    title="Editar"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    title="Deletar"
                    disabled={deleteMutation.isPending}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estatísticas */}
      <div className="text-sm text-gray-500 text-center">
        {filteredPosts.length} de {posts.length} posts
      </div>
    </div>
  );
}
