import axios from 'axios';
import { RentalItem, Order, User } from '../types';

const API_BASE_URL = '/api';

// Items API
export const itemsAPI = {
  getAll: () => axios.get<RentalItem[]>(`${API_BASE_URL}/items`),
  getById: (id: string) => axios.get<RentalItem>(`${API_BASE_URL}/items/${id}`),
  create: (item: Omit<RentalItem, 'id'>) =>
    axios.post<RentalItem>(`${API_BASE_URL}/items`, item),
  update: (id: string, item: Partial<RentalItem>) =>
    axios.put<RentalItem>(`${API_BASE_URL}/items/${id}`, item),
  delete: (id: string) => axios.delete(`${API_BASE_URL}/items/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => axios.get<Order[]>(`${API_BASE_URL}/orders`),
  getById: (id: string) => axios.get<Order>(`${API_BASE_URL}/orders/${id}`),
  create: (order: Omit<Order, 'id' | 'createdAt'>) =>
    axios.post<Order>(`${API_BASE_URL}/orders`, order),
  update: (id: string, order: Partial<Order>) =>
    axios.put<Order>(`${API_BASE_URL}/orders/${id}`, order),
  delete: (id: string) => axios.delete(`${API_BASE_URL}/orders/${id}`),
};

// Auth API
export const authAPI = {
  register: (email: string, password: string, name: string, phone: string) =>
    axios.post<{ user: User; token: string }>(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      name,
      phone,
    }),
  login: (email: string, password: string) =>
    axios.post<{ user: User; token: string }>(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    }),
  logout: () => axios.post(`${API_BASE_URL}/auth/logout`),
};

// Stats API (Admin)
export const statsAPI = {
  getAdminStats: () =>
    axios.get(`${API_BASE_URL}/admin/stats`),
};
