import api, { createAuthenticatedApi } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface GeneratePostData {
  topic: string;
  tone: 'professional' | 'casual' | 'storytelling';
}

export interface GeneratePostResponse {
  posts: string[];
  topic: string;
  tone: string;
}

export interface SavePostData {
  topic: string;
  tone: string;
  content: string;
}

export interface Post {
  id: number;
  topic: string;
  tone: string;
  content: string;
  createdAt: string;
}

export const postApi = {
  generatePost: async (data: GeneratePostData, token?: string): Promise<GeneratePostResponse> => {
    const apiInstance = token ? createAuthenticatedApi(token) : api;
    const response = await apiInstance.post('/generate-post', data);
    return response.data;
  },

  savePost: async (data: SavePostData, token?: string): Promise<Post> => {
    const apiInstance = token ? createAuthenticatedApi(token) : api;
    const response = await apiInstance.post('/posts/save', data);
    return response.data;
  },

  getHistory: async (token?: string): Promise<Post[]> => {
    const apiInstance = token ? createAuthenticatedApi(token) : api;
    const response = await apiInstance.get('/posts/history');
    return response.data;
  },
};
