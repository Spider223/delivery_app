import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useOrderStore } from '../store/useOrderStore';
import { OrderStatus, Order } from '../types';
import NetInfo from '@react-native-community/netinfo';

export default function CreateRequestScreen({ navigation }: any) {
  const { addOrder } = useOrderStore();

  const [recipient, setRecipient] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreate = async () => {
    if (!recipient || !address || !contact) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }


    const orderData: Omit<Order, 'id' | 'createdAt' | 'isSynced'> = {
      sender: 'You',
      recipient,
      address,
      status: OrderStatus.IN_TRANSIT,
      paymentMethod: isOnline ? 'ONLINE' : 'COD',
      isPaid: false,
    };

     try {
    console.log("Before addOrder");

    await addOrder(orderData);

    console.log("After addOrder");

    Alert.alert('Order Created', 'Your delivery request has been saved');
    navigation.navigate('OrderListScreen');
  } catch (error) {
    console.log("ERROR INSIDE ADD ORDER:", error);
    Alert.alert('Error', 'Something went wrong');
  }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipient Name"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      {!isOnline && <Text style={{ color: 'red', marginBottom: 10 }}>Offline: Online payment disabled</Text>}
      <Button title="Create Order" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
});
