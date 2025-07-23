import { Router } from 'express';
import { postController } from '../controllers/postController';

const router = Router();

// Rotas de posts
router.get('/', postController.getAllPosts);
router.get('/search', postController.searchPosts);
router.get('/stats', postController.getStats);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export const postRoutes = router;
