import axios from 'axios';
import type { Post, CreatePostData, UpdatePostData, SearchParams, PaginatedResponse, ApiResponse } from '../types/post';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const postsApi = {
  // Get all posts
  async getAllPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>('/posts');
    return response.data.data || [];
  },

  // Get post by ID
  async getPostById(id: number): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data.data!;
  },

  // Create new post
  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<ApiResponse<Post>>('/posts', data);
    return response.data.data!;
  },

  // Update post
  async updatePost(id: number, data: UpdatePostData): Promise<Post> {
    const response = await api.put<ApiResponse<Post>>(`/posts/${id}`, data);
    return response.data.data!;
  },

  // Delete post
  async deletePost(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/posts/${id}`);
  },

  // Search posts with filters
  async searchPosts(params: SearchParams): Promise<PaginatedResponse<Post>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Post>>>('/posts/search', {
      params,
    });
    return response.data.data!;
  },

  // Get published posts
  async getPublishedPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>('/posts', {
      params: { published: true },
    });
    return response.data.data || [];
  },

  // Get draft posts
  async getDraftPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>('/posts', {
      params: { published: false },
    });
    return response.data.data || [];
  },
};

export default postsApi;
