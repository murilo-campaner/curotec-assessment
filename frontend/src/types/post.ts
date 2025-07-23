import type { PostId, SortField, SortOrder, FilterOption, PaginatedResponse, ApiResponse, DeepPartial } from './base';

export interface Post {
  id: PostId;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  published?: boolean;
}

export interface UpdatePostData extends DeepPartial<CreatePostData> {}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: SortField;
  order?: SortOrder;
  published?: boolean;
  filter?: FilterOption;
}

export interface PostFilters {
  search?: string;
  published?: boolean;
  filter?: FilterOption;
}

export interface PostSort {
  field: SortField;
  order: SortOrder;
}

export interface PostPagination {
  page: number;
  limit: number;
}

// Tipos específicos para hooks
export interface UsePostsOptions {
  filters?: PostFilters;
  sort?: PostSort;
  pagination?: PostPagination;
  enabled?: boolean;
}

export interface UsePostMutationsOptions {
  onSuccess?: (data: Post) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

// Tipos para componentes
export interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  className?: string;
}

export interface PostListProps {
  posts: Post[];
  loading?: boolean;
  error?: Error | null;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  className?: string;
}

export interface PostFormProps {
  post?: Post;
  onSubmit: (data: CreatePostData | UpdatePostData) => void;
  onCancel: () => void;
  loading?: boolean;
  className?: string;
}

// Re-export tipos base
export type { PaginatedResponse, ApiResponse };
