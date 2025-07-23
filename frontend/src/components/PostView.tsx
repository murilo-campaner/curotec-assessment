import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import type { Post } from '../types/post';

interface PostViewProps {
  post: Post;
  onClose: () => void;
  onEdit: () => void;
}

export function PostView({ post, onClose, onEdit }: PostViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Visualizar Post</h2>
            {post.published ? (
              <div className="flex items-center gap-1 text-green-600">
                <EyeIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Publicado</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <EyeSlashIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Rascunho</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="btn-primary text-sm"
            >
              Editar
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Título */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Criado em: {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
              <span>Atualizado em: {new Date(post.updatedAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Metadados */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">ID:</span>
                <span className="ml-2 text-gray-600">{post.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Status:</span>
                <span className={`ml-2 ${post.published ? 'text-green-600' : 'text-gray-600'}`}>
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Tamanho:</span>
                <span className="ml-2 text-gray-600">{post.content.length} caracteres</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
