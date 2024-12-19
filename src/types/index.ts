export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

export interface Order {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  medicines: string[];
  prescriptionUrl?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  cancelledAt?: string;
}
