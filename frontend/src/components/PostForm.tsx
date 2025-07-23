import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { postsApi } from '../services/postsApi';
import type { Post, CreatePostData, UpdatePostData } from '../types/post';

interface PostFormProps {
  post?: Post;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PostForm({ post, onClose, onSuccess }: PostFormProps) {
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    published: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const isEditing = !!post;

  // Preencher formulário com dados do post quando estiver editando
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        published: post.published,
      });
    }
  }, [post]);

  // Mutation para criar/atualizar post
  const mutation = useMutation({
    mutationFn: (data: CreatePostData | UpdatePostData) => {
      if (isEditing && post) {
        return postsApi.updatePost(post.id, data as UpdatePostData);
      } else {
        return postsApi.createPost(data as CreatePostData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.();
      onClose();
    },
    onError: (error: any) => {
      console.error('Erro ao salvar post:', error);
      setErrors({
        submit: error.response?.data?.error?.message || 'Erro ao salvar post',
      });
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Conteúdo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    mutation.mutate(formData);
  };

  const handleInputChange = (field: keyof CreatePostData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Post' : 'Novo Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Digite o título do post"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Conteúdo */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={8}
              className={`input-field ${errors.content ? 'border-red-500' : ''}`}
              placeholder="Digite o conteúdo do post"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {/* Status de publicação */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => handleInputChange('published', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Publicar post
            </label>
          </div>

          {/* Erro geral */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={mutation.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </div>
              ) : (
                isEditing ? 'Atualizar' : 'Criar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
