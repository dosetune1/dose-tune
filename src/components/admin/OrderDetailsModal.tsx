import React from 'react';
import type { Order } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Order Details
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Customer:</strong> {order.customerName}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Phone:</strong> {order.phone}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Address:</strong> {order.address}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Created At:</strong> {formatDate(order.createdAt)}
            </p>
            {order.status === 'completed' && (
              <p className="text-sm text-gray-500 mb-2">
                <strong>Completed At:</strong> {formatDate(order.completedAt)}
              </p>
            )}
            {order.status === 'cancelled' && (
              <p className="text-sm text-gray-500 mb-2">
                <strong>Cancelled At:</strong> {formatDate(order.cancelledAt)}
              </p>
            )}
            <div className="text-sm text-gray-500 mb-2">
              <strong>Medicines:</strong>
              <ul className="list-disc pl-5 mt-1">
                {order.medicines?.map((medicine, index) => (
                  <li key={`${order._id}-medicine-${index}`}>{medicine}</li>
                ))}
              </ul>
            </div>
            {order.prescriptionUrl && (
              <a
                href={order.prescriptionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View Prescription
              </a>
            )}
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
