import { create } from 'zustand';
import { Order } from '../types';
import { OrderRepository } from '../services/OrderRepository';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  loadOrders: () => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'isSynced'>) => Promise<void>;
  syncOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  loadOrders: async () => {
    set({ isLoading: true });
    const data = await OrderRepository.getOrders();
    set({ orders: data, isLoading: false });
  },
  addOrder: async (order) => {
    const newOrder = await OrderRepository.createOrder(order);
    set({ orders: [newOrder, ...get().orders] });
  },
  syncOrders: async () => {
    set({ isLoading: true });
    await OrderRepository.syncPendingOrders();
    const data = await OrderRepository.getOrders();
    set({ orders: data, isLoading: false });
  },
}));
