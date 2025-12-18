// Types for rental items and orders
export interface RentalItem {
  id: string;
  name: string;
  category: 'chairs' | 'tables' | 'chair-covers' | 'chafing-dishes' | 'linens' | 'decorations';
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
