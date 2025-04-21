// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Stripe Configuration
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Image paths
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || '/images';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12;

// Categories
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Beauty & Personal Care',
  'Sports & Outdoors',
  'Toys & Games',
  'Health & Wellness',
];

// Order statuses
export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-warning-500' },
  { value: 'processing', label: 'Processing', color: 'bg-primary-500' },
  { value: 'shipped', label: 'Shipped', color: 'bg-secondary-500' },
  { value: 'delivered', label: 'Delivered', color: 'bg-success-500' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-error-500' },
];

// Mock data for development
export const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, perfect for immersive listening experiences.',
    price: 299.99,
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    category: 'Electronics',
    stock: 15,
    avgRating: 4.7,
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-06-20T14:15:00Z',
  },
  {
    _id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and sleep tracking.',
    price: 199.99,
    images: ['https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    category: 'Electronics',
    stock: 25,
    avgRating: 4.5,
    createdAt: '2023-04-10T09:45:00Z',
    updatedAt: '2023-06-18T11:20:00Z',
  },
  {
    _id: '3',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft and comfortable 100% organic cotton t-shirt with a modern fit.',
    price: 29.99,
    images: ['https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    category: 'Clothing',
    stock: 50,
    avgRating: 4.3,
    createdAt: '2023-03-20T13:15:00Z',
    updatedAt: '2023-06-15T10:45:00Z',
  },
  {
    _id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Adjustable office chair with lumbar support designed for comfort during long work hours.',
    price: 249.99,
    images: ['https://images.pexels.com/photos/5792901/pexels-photo-5792901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    category: 'Home & Kitchen',
    stock: 10,
    avgRating: 4.8,
    createdAt: '2023-02-28T16:30:00Z',
    updatedAt: '2023-06-10T15:20:00Z',
  },
  {
    _id: '5',
    name: 'Bestselling Novel Collection',
    description: 'A collection of five award-winning novels from renowned authors.',
    price: 59.99,
    images: ['https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    category: 'Books',
    stock: 30,
    avgRating: 4.6,
    createdAt: '2023-01-15T11:45:00Z',
    updatedAt: '2023-06-05T09:30:00Z',
  },
  {
    _id: '6',
    name: 'Professional Camera Kit',
    description: 'Complete photography kit with DSLR camera, multiple lenses, and accessories.',
    price: 1299.99,
    images: ['https://images.pexels.com/photos/3602258/pexels-photo-3602258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    category: 'Electronics',
    stock: 5,
    avgRating: 4.9,
    createdAt: '2022-12-10T14:20:00Z',
    updatedAt: '2023-06-01T13:10:00Z',
  }
];