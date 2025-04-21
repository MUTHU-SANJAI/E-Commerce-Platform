import { create } from 'zustand';
import axios from 'axios';
import { User, AuthResponse } from '../types';
import { API_URL } from '../config';

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      localStorage.setItem('token', token);
      
      set({
        user,
        token,
        isAuthenticated: true,
        isAdmin: user.role === 'admin',
        isLoading: false,
      });
    } catch (error) {
      console.error('Login error:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to login',
      });
    }
  },

  register: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      const { user, token } = response.data;
      localStorage.setItem('token', token);
      
      set({
        user,
        token,
        isAuthenticated: true,
        isAdmin: user.role === 'admin',
        isLoading: false,
      });
    } catch (error) {
      console.error('Registration error:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to register',
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      set({ isLoading: true });
      const response = await axios.get<{ user: User }>(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isAdmin: response.data.user.role === 'admin',
        isLoading: false,
      });
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
      });
    }
  },

  forgotPassword: async (email) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      set({ isLoading: false });
    } catch (error) {
      console.error('Forgot password error:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to process request',
      });
    }
  },

  resetPassword: async (token, password) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password,
      });
      set({ isLoading: false });
    } catch (error) {
      console.error('Reset password error:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to reset password',
      });
    }
  },

  updateProfile: async (userData) => {
    const { token } = get();
    
    try {
      set({ isLoading: true, error: null });
      const response = await axios.put<{ user: User }>(
        `${API_URL}/users/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      console.error('Profile update error:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      });
    }
  },

  clearError: () => set({ error: null }),
}));