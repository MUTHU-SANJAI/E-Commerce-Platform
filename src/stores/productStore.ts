import { create } from 'zustand';
import axios from 'axios';
import { Product } from '../types';
import { API_URL } from '../config';

type ProductsState = {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string | null;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  setFilters: (filters: Partial<ProductsState['filters']>) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
  clearError: () => void;
};

export const useProductStore = create<ProductsState>((set, get) => ({
  products: [],
  product: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: null,
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },

  fetchProducts: async () => {
    const { filters, pagination } = get();
    
    try {
      set({ loading: true, error: null });
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice !== null) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== null) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
      
      const response = await axios.get<{
        products: Product[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      }>(`${API_URL}/products?${params.toString()}`);
      
      set({
        products: response.data.products,
        pagination: {
          page: response.data.page,
          limit: response.data.limit,
          total: response.data.total,
          totalPages: response.data.totalPages,
        },
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
      });
    }
  },

  fetchProductById: async (id) => {
    try {
      set({ loading: true, error: null, product: null });
      
      const response = await axios.get<Product>(`${API_URL}/products/${id}`);
      
      set({
        product: response.data,
        loading: false,
      });
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
      });
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }, // Reset to first page when filters change
    }));
  },

  setPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        category: null,
        minPrice: null,
        maxPrice: null,
        sortBy: null,
      },
      pagination: {
        ...get().pagination,
        page: 1,
      },
    });
  },

  clearError: () => set({ error: null }),
}));