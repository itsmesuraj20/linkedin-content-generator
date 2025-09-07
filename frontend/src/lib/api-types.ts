import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
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

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

export const postApi = {
  generatePost: async (data: GeneratePostData): Promise<GeneratePostResponse> => {
    const response = await api.post('/generate-post', data);
    return response.data;
  },

  savePost: async (data: SavePostData): Promise<Post> => {
    const response = await api.post('/posts/save', data);
    return response.data;
  },

  getHistory: async (): Promise<Post[]> => {
    const response = await api.get('/posts/history');
    return response.data;
  },
};
