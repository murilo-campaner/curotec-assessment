import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { postRoutes } from '../posts';
import { errorHandler } from '../../middlewares/errorHandler';

// Criar app de teste separado
const createTestApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());

  app.use('/api/posts', postRoutes);
  app.use(errorHandler);

  return app;
};

const app = createTestApp();
const prisma = new PrismaClient();

describe('Posts API Integration Tests', () => {
  let testPostId: number;

  beforeAll(async () => {
    // Limpar banco de dados antes dos testes
    await prisma.post.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Limpar posts antes de cada teste
    await prisma.post.deleteMany();
  });

  describe('POST /api/posts', () => {
    it('should create a new post successfully', async () => {
      const postData = {
        title: 'Test Post',
        content: 'Test content',
        published: true,
      };

      const response = await request(app)
        .post('/api/posts')
        .send(postData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(postData.title);
      expect(response.body.data.content).toBe(postData.content);
      expect(response.body.data.published).toBe(postData.published);
      expect(response.body.data.id).toBeDefined();

      testPostId = response.body.data.id;
    });

    it('should return 400 for invalid data - empty title', async () => {
      const invalidData = {
        title: '',
        content: 'Test content',
      };

      const response = await request(app)
        .post('/api/posts')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should return 400 for invalid data - missing title', async () => {
      const invalidData = {
        content: 'Test content',
      };

      const response = await request(app)
        .post('/api/posts')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/posts', () => {
    beforeEach(async () => {
      // Criar posts de teste
      await prisma.post.createMany({
        data: [
          {
            title: 'Post 1',
            content: 'Content 1',
            published: true,
          },
          {
            title: 'Post 2',
            content: 'Content 2',
            published: false,
          },
          {
            title: 'Another Post',
            content: 'Another content',
            published: true,
          },
        ],
      });
    });

    it('should return all posts', async () => {
      const response = await request(app)
        .get('/api/posts')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.count).toBe(3);
    });

    it('should filter posts by published status - published only', async () => {
      const response = await request(app)
        .get('/api/posts/search?published=true')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.every((post: any) => post.published)).toBe(true);
    });

    it('should filter posts by published status - drafts only', async () => {
      const response = await request(app)
        .get('/api/posts/search?published=false')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].published).toBe(false);
    });

    it('should search posts by query', async () => {
      const response = await request(app)
        .get('/api/posts/search?query=Post 1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Post 1');
    });

    it('should handle pagination correctly', async () => {
      const response = await request(app)
        .get('/api/posts/search?page=1&limit=2')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(2);
      expect(response.body.pagination.hasNext).toBe(true);
    });
  });

  describe('GET /api/posts/:id', () => {
    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          title: 'Test Post',
          content: 'Test content',
          published: true,
        },
      });
      testPostId = post.id;
    });

    it('should return a specific post', async () => {
      const response = await request(app)
        .get(`/api/posts/${testPostId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testPostId);
      expect(response.body.data.title).toBe('Test Post');
      expect(response.body.data.content).toBe('Test content');
      expect(response.body.data.published).toBe(true);
    });

    it('should return 404 for non-existent post', async () => {
      const response = await request(app)
        .get('/api/posts/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/posts/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('PUT /api/posts/:id', () => {
    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          title: 'Original Post',
          content: 'Original content',
          published: false,
        },
      });
      testPostId = post.id;
    });

    it('should update a post successfully', async () => {
      const updateData = {
        title: 'Updated Post',
        content: 'Updated content',
        published: true,
      };

      const response = await request(app)
        .put(`/api/posts/${testPostId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.content).toBe(updateData.content);
      expect(response.body.data.published).toBe(updateData.published);
    });

    it('should update only provided fields', async () => {
      const updateData = {
        title: 'Updated Title Only',
      };

      const response = await request(app)
        .put(`/api/posts/${testPostId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.content).toBe('Original content');
      expect(response.body.data.published).toBe(false);
    });

    it('should return 404 for non-existent post', async () => {
      const updateData = {
        title: 'Updated Post',
      };

      const response = await request(app)
        .put('/api/posts/999')
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        title: '',
      };

      const response = await request(app)
        .put(`/api/posts/${testPostId}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          title: 'Test Post',
          content: 'Test content',
          published: true,
        },
      });
      testPostId = post.id;
    });

    it('should delete a post successfully', async () => {
      const response = await request(app)
        .delete(`/api/posts/${testPostId}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verificar se o post foi realmente deletado
      await request(app)
        .get(`/api/posts/${testPostId}`)
        .expect(404);
    });

    it('should return 404 for non-existent post', async () => {
      const response = await request(app)
        .delete('/api/posts/999')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
