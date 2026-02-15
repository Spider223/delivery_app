export enum OrderStatus {
  PENDING = 'Pending',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
}

export interface Order {
  id: string;
  sender: string;
  recipient: string;
  address: string;
  status: OrderStatus;
  paymentMethod: 'COD' | 'ONLINE';
  isPaid: boolean;
  isSynced: boolean;
  createdAt: string;
}