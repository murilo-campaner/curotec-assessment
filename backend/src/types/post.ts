import { z } from 'zod';

// Branded types para IDs
export type PostId = number & { readonly brand: unique symbol };

// Schemas de validação com mensagens em inglês
export const createPostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must have a maximum of 255 characters')
    .trim(),
  content: z.string()
    .min(1, 'Content is required')
    .max(10000, 'Content must have a maximum of 10000 characters')
    .trim(),
  published: z.boolean().optional().default(false),
});

export const updatePostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must have a maximum of 255 characters')
    .trim()
    .optional(),
  content: z.string()
    .min(1, 'Content is required')
    .max(10000, 'Content must have a maximum of 10000 characters')
    .trim()
    .optional(),
  published: z.boolean().optional(),
});

export const searchPostsSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number()
    .int('Page must be an integer')
    .min(1, 'Page must be greater than 0')
    .default(1),
  limit: z.coerce.number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be greater than 0')
    .max(100, 'Maximum limit is 100')
    .default(10),
  sort: z.enum(['createdAt', 'updatedAt', 'title'], {
    errorMap: () => ({ message: 'Sort field must be createdAt, updatedAt, or title' })
  }).default('createdAt'),
  order: z.enum(['asc', 'desc'], {
    errorMap: () => ({ message: 'Order must be asc or desc' })
  }).default('desc'),
  published: z.coerce.boolean().optional(),
  filter: z.enum(['all', 'published', 'draft']).optional(),
});

export const postIdSchema = z.object({
  id: z.coerce.number()
    .int('ID must be an integer')
    .positive('ID must be a positive number'),
});

// Tipos TypeScript derivados dos schemas
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type SearchPostsInput = z.infer<typeof searchPostsSchema>;
export type PostIdInput = z.infer<typeof postIdSchema>;

// Tipos de resposta da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

export interface ApiError {
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  details?: Record<string, string[]>;
}

// Tipos de paginação
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Tipos de filtro e ordenação
export type SortField = 'createdAt' | 'updatedAt' | 'title';
export type SortOrder = 'asc' | 'desc';
export type FilterOption = 'all' | 'published' | 'draft';

// Tipos para serviços
export interface PostService {
  create(data: CreatePostInput): Promise<Post>;
  update(id: PostId, data: UpdatePostInput): Promise<Post>;
  delete(id: PostId): Promise<void>;
  findById(id: PostId): Promise<Post | null>;
  findAll(params: SearchPostsInput): Promise<PaginatedResponse<Post>>;
}

// Tipos para controllers
export interface PostController {
  create(req: CreatePostRequest): Promise<ApiResponse<Post>>;
  update(req: UpdatePostRequest): Promise<ApiResponse<Post>>;
  delete(req: DeletePostRequest): Promise<ApiResponse<void>>;
  findById(req: FindPostRequest): Promise<ApiResponse<Post>>;
  findAll(req: FindAllPostsRequest): Promise<ApiResponse<PaginatedResponse<Post>>>;
}

// Tipos para requests
export interface CreatePostRequest {
  body: CreatePostInput;
}

export interface UpdatePostRequest {
  params: PostIdInput;
  body: UpdatePostInput;
}

export interface DeletePostRequest {
  params: PostIdInput;
}

export interface FindPostRequest {
  params: PostIdInput;
}

export interface FindAllPostsRequest {
  query: SearchPostsInput;
}

// Tipo para entidade Post
export interface Post {
  id: PostId;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
