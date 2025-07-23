import axios from 'axios';
import type { Post, CreatePostData, UpdatePostData, SearchParams, PaginatedResponse, ApiResponse } from '../types/post';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const postsApi = {
  // Buscar todos os posts
  async getAllPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>('/posts');
    return response.data.data || [];
  },

  // Buscar post por ID
  async getPostById(id: number): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data.data!;
  },

  // Criar novo post
  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<ApiResponse<Post>>('/posts', data);
    return response.data.data!;
  },

  // Atualizar post
  async updatePost(id: number, data: UpdatePostData): Promise<Post> {
    const response = await api.put<ApiResponse<Post>>(`/posts/${id}`, data);
    return response.data.data!;
  },

  // Deletar post
  async deletePost(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/posts/${id}`);
  },

  // Buscar posts com filtros
  async searchPosts(params: SearchParams): Promise<PaginatedResponse<Post>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Post>>>('/posts/search', {
      params,
    });
    return response.data.data!;
  },

  // Buscar posts publicados
  async getPublishedPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>('/posts', {
      params: { published: true },
    });
    return response.data.data || [];
  },

  // Buscar posts não publicados
  async getDraftPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>('/posts', {
      params: { published: false },
    });
    return response.data.data || [];
  },
};

export default postsApi;
