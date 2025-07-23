import { Request, Response } from 'express';
import { postService } from '../services/postService';
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
    const result = await postService.search(req.query as any);

    res.json({
      success: true,
      ...result,
    });
  });

  // GET /api/posts/:id - Buscar post por ID
  getPostById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postService.findById(Number(id));

    res.json({
      success: true,
      data: post,
    });
  });

  // POST /api/posts - Criar novo post
  createPost = asyncHandler(async (req: Request, res: Response) => {
    const post = await postService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  });

  // PUT /api/posts/:id - Atualizar post
  updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postService.update(Number(id), req.body);

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  });

  // DELETE /api/posts/:id - Deletar post
  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await postService.delete(Number(id));

    res.json({
      success: true,
      message: 'Post deleted successfully',
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
