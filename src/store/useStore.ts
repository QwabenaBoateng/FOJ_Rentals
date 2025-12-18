import { create } from 'zustand';
import { RentalItem, CartItem, Order, User } from '../types';

interface Store {
  // Items
  items: RentalItem[];
  setItems: (items: RentalItem[]) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: RentalItem, quantity: number, rentalPeriod: 'day' | 'week' | 'month', startDate: Date, endDate: Date) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  
  // Orders
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  
  // Filters
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<Store>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  
  cart: [],
  addToCart: (item, quantity, rentalPeriod, startDate, endDate) =>
    set((state) => {
      const existingItem = state.cart.find((ci) => ci.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((ci) =>
            ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
          ),
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity, rentalPeriod, startDate, endDate }],
      };
    }),
  
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  
  clearCart: () => set({ cart: [] }),
  
  updateCartItem: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  
  user: null,
  setUser: (user) => set({ user }),
  
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  
  orders: [],
  setOrders: (orders) => set({ orders }),
  
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
