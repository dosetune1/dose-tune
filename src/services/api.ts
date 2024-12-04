import axios from 'axios';
import type { Order } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://dose-tune.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderApi = {
  getAllOrders: async () => {
    try {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  },

  createOrder: async (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    try {
      const response = await api.post<Order>('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  },

  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    if (!orderId) {
      throw new Error('Order ID is required');
    }
    
    try {
      const response = await api.patch<Order>(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  },
};
