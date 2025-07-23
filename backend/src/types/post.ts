import { z } from 'zod';

// Schema de validação para criação de post
export const createPostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título deve ter no máximo 255 caracteres'),
  content: z.string().min(1, 'Conteúdo é obrigatório').max(10000, 'Conteúdo deve ter no máximo 10000 caracteres'),
  published: z.boolean().optional().default(false),
});

// Schema de validação para atualização de post
export const updatePostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título deve ter no máximo 255 caracteres').optional(),
  content: z.string().min(1, 'Conteúdo é obrigatório').max(10000, 'Conteúdo deve ter no máximo 10000 caracteres').optional(),
  published: z.boolean().optional(),
});

// Schema de validação para busca de posts
export const searchPostsSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().min(1, 'Página deve ser maior que 0').default(1),
  limit: z.coerce.number().min(1, 'Limite deve ser maior que 0').max(100, 'Limite máximo é 100').default(10),
  sort: z.enum(['createdAt', 'updatedAt', 'title']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  published: z.coerce.boolean().optional(),
});

// Schema de validação para ID
export const postIdSchema = z.object({
  id: z.coerce.number().int().positive('ID deve ser um número inteiro positivo'),
});

// Tipos TypeScript derivados dos schemas
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type SearchPostsInput = z.infer<typeof searchPostsSchema>;
export type PostIdInput = z.infer<typeof postIdSchema>;

// Tipo para resposta de paginação
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
