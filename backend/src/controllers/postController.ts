import { Request, Response } from 'express';
import { postService } from '../services/postService';
import { createPostSchema, updatePostSchema, searchPostsSchema, postIdSchema } from '../types/post';
import { asyncHandler } from '../middlewares/errorHandler';

export class PostController {
  // GET /api/posts - Listar todos os posts
  getAllPosts = asyncHandler(async (_req: Request, res: Response) => {
    const posts = await postService.findAll();

    res.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  });

  // GET /api/posts/search - Buscar posts com filtros
  searchPosts = asyncHandler(async (req: Request, res: Response) => {
    const validatedParams = searchPostsSchema.parse(req.query);
    const result = await postService.search(validatedParams);

    res.json({
      success: true,
      ...result,
    });
  });

  // GET /api/posts/:id - Buscar post por ID
  getPostById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = postIdSchema.parse(req.params);
    const post = await postService.findById(id);

    res.json({
      success: true,
      data: post,
    });
  });

  // POST /api/posts - Criar novo post
  createPost = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createPostSchema.parse(req.body);
    const post = await postService.create(validatedData);

    res.status(201).json({
      success: true,
      message: 'Post criado com sucesso',
      data: post,
    });
  });

  // PUT /api/posts/:id - Atualizar post
  updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = postIdSchema.parse(req.params);
    const validatedData = updatePostSchema.parse(req.body);
    const post = await postService.update(id, validatedData);

    res.json({
      success: true,
      message: 'Post atualizado com sucesso',
      data: post,
    });
  });

  // DELETE /api/posts/:id - Deletar post
  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = postIdSchema.parse(req.params);
    await postService.delete(id);

    res.json({
      success: true,
      message: 'Post deletado com sucesso',
    });
  });

  // GET /api/posts/stats - Estatísticas dos posts
  getStats = asyncHandler(async (_req: Request, res: Response) => {
    const [publishedCount, draftsCount] = await Promise.all([
      postService.countPublished(),
      postService.countDrafts(),
    ]);

    res.json({
      success: true,
      data: {
        published: publishedCount,
        drafts: draftsCount,
        total: publishedCount + draftsCount,
      },
    });
  });
}

export const postController = new PostController();
