import { Request, Response } from 'express';
import { postService } from '../services/postService';
import { asyncHandler } from '../middlewares/errorHandler';

export class PostController {
  /**
   * @swagger
   * /api/posts:
   *   get:
   *     summary: Get all posts
   *     description: Retrieve all posts ordered by creation date (newest first)
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: List of all posts
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Post'
   *                 count:
   *                   type: integer
   *                   description: Total number of posts
   *                   example: 5
   */
  // GET /api/posts - Listar todos os posts
  getAllPosts = asyncHandler(async (_req: Request, res: Response) => {
    const posts = await postService.findAll();

    res.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  });

  /**
   * @swagger
   * /api/posts/search:
   *   get:
   *     summary: Search and filter posts
   *     description: Search posts by query and apply filters with pagination
   *     tags: [Posts]
   *     parameters:
   *       - in: query
   *         name: query
   *         schema:
   *           type: string
   *         description: Search query for title or content
   *         example: react
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: Page number for pagination
   *         example: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         description: Number of items per page
   *         example: 10
   *       - in: query
   *         name: sort
   *         schema:
   *           type: string
   *           enum: [createdAt, updatedAt, title]
   *           default: createdAt
   *         description: Field to sort by
   *         example: createdAt
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *           default: desc
   *         description: Sort order
   *         example: desc
   *       - in: query
   *         name: published
   *         schema:
   *           type: string
   *           enum: [true, false]
   *         description: Filter by published status
   *         example: true
   *     responses:
   *       200:
   *         description: Paginated search results
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PaginatedResponse'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/posts/search - Buscar posts com filtros
  searchPosts = asyncHandler(async (req: Request, res: Response) => {
    console.log('Search query:', req.query);
    const result = await postService.search(req.query as any);

    res.json({
      success: true,
      ...result,
    });
  });

  /**
   * @swagger
   * /api/posts/{id}:
   *   get:
   *     summary: Get post by ID
   *     description: Retrieve a specific post by its ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Post ID
   *         example: 1
   *     responses:
   *       200:
   *         description: Post found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Post'
   *       400:
   *         description: Invalid ID format
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Post not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/posts/:id - Buscar post por ID
  getPostById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postService.findById(Number(id));

    res.json({
      success: true,
      data: post,
    });
  });

  /**
   * @swagger
   * /api/posts:
   *   post:
   *     summary: Create a new post
   *     description: Create a new post with title, content and optional published status
   *     tags: [Posts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreatePostRequest'
   *           example:
   *             title: "Getting Started with React"
   *             content: "React is a JavaScript library for building user interfaces..."
   *             published: false
   *     responses:
   *       201:
   *         description: Post created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Post created successfully
   *                 data:
   *                   $ref: '#/components/schemas/Post'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // POST /api/posts - Criar novo post
  createPost = asyncHandler(async (req: Request, res: Response) => {
    const post = await postService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  });

  /**
   * @swagger
   * /api/posts/{id}:
   *   put:
   *     summary: Update a post
   *     description: Update an existing post by ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Post ID
   *         example: 1
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdatePostRequest'
   *           example:
   *             title: "Updated Title"
   *             content: "Updated content..."
   *             published: true
   *     responses:
   *       200:
   *         description: Post updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Post updated successfully
   *                 data:
   *                   $ref: '#/components/schemas/Post'
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Post not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
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

  /**
   * @swagger
   * /api/posts/{id}:
   *   delete:
   *     summary: Delete a post
   *     description: Delete a post by ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Post ID
   *         example: 1
   *     responses:
   *       200:
   *         description: Post deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Post deleted successfully
   *       400:
   *         description: Invalid ID format
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Post not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // DELETE /api/posts/:id - Deletar post
  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await postService.delete(Number(id));

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  });

  /**
   * @swagger
   * /api/posts/stats:
   *   get:
   *     summary: Get post statistics
   *     description: Get statistics about published and draft posts
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: Post statistics
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/StatsResponse'
   */
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
