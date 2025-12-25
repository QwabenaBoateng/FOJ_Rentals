// Types for rental items and orders
export interface RentalItem {
  id: string;
  name: string;
  category: 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes';
  description: string;
  image: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends RentalItem {
  quantity: number;
  rentalPeriod: 'day' | 'week' | 'month';
  startDate: Date;
  endDate: Date;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryDate: Date;
  returnDate: Date;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  isAdmin: boolean;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  activeRentals: number;
  totalCustomers: number;
  monthlyRevenue: number[];
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
  createdAt: Date;
  isActive: boolean;
}
