import React, { memo } from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import type { Order } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface OrderTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

export const OrderTable = memo<OrderTableProps>(({
  orders,
  onViewOrder,
  onUpdateStatus,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Completed/Cancelled Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.customerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.status === 'completed' ? formatDate(order.completedAt) :
                 order.status === 'cancelled' ? formatDate(order.cancelledAt) :
                 '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onViewOrder(order)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onUpdateStatus(order._id, 'completed')}
                  className={`text-green-600 hover:text-green-900 mr-4 ${
                    order.status === 'completed' || order.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={order.status === 'completed' || order.status === 'cancelled'}
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onUpdateStatus(order._id, 'cancelled')}
                  className={`text-red-600 hover:text-red-900 ${
                    order.status === 'completed' || order.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={order.status === 'completed' || order.status === 'cancelled'}
                >                  
                  <XCircle className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

OrderTable.displayName = 'OrderTable';