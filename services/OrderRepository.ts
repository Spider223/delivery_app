import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = '@orders_data';

export const OrderRepository = {
  getOrders: async (): Promise<Order[]> => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'isSynced'>): Promise<Order> => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isSynced: false,
    };
    const orders = await OrderRepository.getOrders();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newOrder, ...orders]));
    return newOrder;
  },

  syncPendingOrders: async (): Promise<void> => {
    const orders = await OrderRepository.getOrders();
    const updated = orders.map(o => (o.isSynced ? o : { ...o, isSynced: true }));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
};
