import { create } from 'zustand';
import type { Order } from '../types';
import { orderApi } from '../services/api';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt' | '_id'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await orderApi.getAllOrders();
      set({ orders, loading: false });
    } catch (error) {
      console.error('Error fetching orders:', error);
      set({ loading: false, error: 'Failed to fetch orders. Please try again.' });
    }
  },

  addOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const newOrder = await orderApi.createOrder(orderData);
      set((state) => ({
        orders: [newOrder, ...state.orders],
        loading: false,
      }));
    } catch (error) {
      console.error('Error creating order:', error);
      set({ loading: false, error: 'Failed to create order. Please try again.' });
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    // Optimistically update the UI
    const previousOrders = get().orders;
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === orderId ? { ...order, status } : order
      ),
    }));

    try {
      const updatedOrder = await orderApi.updateOrderStatus(orderId, status);
      // Update with the server response
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? updatedOrder : order
        ),
      }));
    } catch (error) {
      // Revert to previous state if the update fails
      set({ orders: previousOrders });
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  },
}));