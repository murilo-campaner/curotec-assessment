export interface Post {
  id: number;
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

export interface UpdatePostData {
  title?: string;
  content?: string;
  published?: boolean;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: 'createdAt' | 'updatedAt' | 'title';
  order?: 'asc' | 'desc';
  published?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    statusCode: number;
    timestamp: string;
    path: string;
  };
}
