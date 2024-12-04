import React, { useEffect, useCallback } from 'react';
import { Loader } from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';
import { OrderTable } from './OrderTable';
import { OrderDetailsModal } from './OrderDetailsModal';
import type { Order } from '../../types';

export const AdminPanel = () => {
  const { orders, loading, error, fetchOrders, updateOrderStatus } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusUpdate = useCallback(async (orderId: Order['_id'], status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  }, [updateOrderStatus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <OrderTable
            orders={orders}
            onViewOrder={setSelectedOrder}
            onUpdateStatus={handleStatusUpdate}
          />
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};