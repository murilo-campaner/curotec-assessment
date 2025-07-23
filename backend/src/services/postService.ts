import { PrismaClient, Post } from '@prisma/client';
import { CreatePostInput, UpdatePostInput, SearchPostsInput, PaginatedResponse } from '../types/post';
import { createError } from '../middlewares/errorHandler';

const prisma = new PrismaClient();

export class PostService {
  // Buscar todos os posts
  async findAll(): Promise<Post[]> {
    try {
      return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw createError('Erro ao buscar posts', 500);
    }
  }

  // Buscar post por ID
  async findById(id: number): Promise<Post> {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw createError('Post não encontrado', 404);
      }

      return post;
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error;
      }
      throw createError('Erro ao buscar post', 500);
    }
  }

  // Criar novo post
  async create(data: CreatePostInput): Promise<Post> {
    try {
      return await prisma.post.create({
        data,
      });
    } catch (error) {
      throw createError('Erro ao criar post', 500);
    }
  }

  // Atualizar post
  async update(id: number, data: UpdatePostInput): Promise<Post> {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw createError('Post não encontrado', 404);
      }

      // Filtrar apenas campos que foram fornecidos
      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.content !== undefined) updateData.content = data.content;
      if (data.published !== undefined) updateData.published = data.published;

      return await prisma.post.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error;
      }
      throw createError('Erro ao atualizar post', 500);
    }
  }

  // Deletar post
  async delete(id: number): Promise<void> {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw createError('Post não encontrado', 404);
      }

      await prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error;
      }
      throw createError('Erro ao deletar post', 500);
    }
  }

  // Buscar posts com filtros e paginação
  async search(params: SearchPostsInput): Promise<PaginatedResponse<Post>> {
    try {
      const { query, page, limit, sort, order, published } = params;
      const skip = (page - 1) * limit;

      // Construir filtros
      const where: any = {};

      if (query) {
        where.OR = [
          { title: { contains: query, mode: 'insensitive' as any } },
          { content: { contains: query, mode: 'insensitive' as any } },
        ];
      }

      if (published !== undefined) {
        where.published = published;
      }

      // Contar total de registros
      const total = await prisma.post.count({ where });

      // Buscar posts
      const posts = await prisma.post.findMany({
        where,
        orderBy: { [sort]: order },
        skip,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        data: posts,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw createError('Erro ao buscar posts', 500);
    }
  }

  // Contar posts publicados
  async countPublished(): Promise<number> {
    try {
      return await prisma.post.count({
        where: { published: true },
      });
    } catch (error) {
      throw createError('Erro ao contar posts publicados', 500);
    }
  }

  // Contar posts não publicados
  async countDrafts(): Promise<number> {
    try {
      return await prisma.post.count({
        where: { published: false },
      });
    } catch (error) {
      throw createError('Erro ao contar rascunhos', 500);
    }
  }
}

export const postService = new PostService();
