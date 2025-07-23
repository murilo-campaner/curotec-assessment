import { Router } from 'express';
import { postController } from '../controllers/postController';
import { validate, validateMultiple } from '../middlewares/validation';
import { createPostSchema, updatePostSchema, searchPostsSchema, postIdSchema } from '../types/post';

const router = Router();

// Rotas de posts
router.get('/', postController.getAllPosts);
router.get('/search', validate(searchPostsSchema, 'query'), postController.searchPosts);
router.get('/stats', postController.getStats);
router.get('/:id', validate(postIdSchema, 'params'), postController.getPostById);
router.post('/', validate(createPostSchema), postController.createPost);
router.put('/:id', validateMultiple({ params: postIdSchema, body: updatePostSchema }), postController.updatePost);
router.delete('/:id', validate(postIdSchema, 'params'), postController.deletePost);

export const postRoutes = router;
