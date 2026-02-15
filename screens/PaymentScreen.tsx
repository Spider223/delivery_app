
import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useOrderStore } from '../store/useOrderStore';

export default function PaymentScreen({ route, navigation }: any) {
  const { order } = route.params;
  const { syncOrders } = useOrderStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      Alert.alert('Payment Successful', 'Your order payment is complete');
      await syncOrders(); // mark order as synced
      navigation.navigate('OrderListScreen');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text>Order ID: {order.id}</Text>
      <Text>Method: {order.paymentMethod}</Text>
      {order.paymentMethod === 'COD' ? (
        <Text>Payment will be collected on delivery</Text>
      ) : (
        <Button title={isProcessing ? 'Processing...' : 'Pay Now'} onPress={handlePayment} disabled={isProcessing} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});
