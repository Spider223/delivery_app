import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatus } from '../types';

export default function OrderDetailsScreen({ route }: any) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text>ID: {order.id}</Text>
      <Text>Sender: {order.sender}</Text>
      <Text>Recipient: {order.recipient}</Text>
      <Text>Address: {order.address}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Payment Method: {order.paymentMethod}</Text>
      <Text>Payment Status: {order.isPaid ? 'Paid' : 'Pending'}</Text>
      <Text>Synced: {order.isSynced ? 'Yes' : 'No'}</Text>
      <Text>Created At: {new Date(order.createdAt).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});
