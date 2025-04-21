import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '../types';

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  } | null;
  paymentMethod: string | null;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setShippingAddress: (address: CartState['shippingAddress']) => void;
  setPaymentMethod: (method: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      shippingAddress: null,
      paymentMethod: null,

      addToCart: (product, quantity) => {
        const { items } = get();
        const existingItem = items.find(item => item.product._id === product._id);

        let updatedItems;
        if (existingItem) {
          updatedItems = items.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedItems = [...items, { product, quantity }];
        }

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      removeFromCart: (productId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.product._id !== productId);

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          return get().removeFromCart(productId);
        }

        const updatedItems = items.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        );

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
          shippingAddress: null,
          paymentMethod: null,
        });
      },

      setShippingAddress: (address) => {
        set({ shippingAddress: address });
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);