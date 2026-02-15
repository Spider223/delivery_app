import React, { useEffect } from 'react';
import { View, FlatList, Text, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { useOrderStore } from '../store/useOrderStore';
import { OrderStatus } from '../types';

export default function OrderListScreen({ navigation }: any) {
  const { orders, loadOrders, isLoading } = useOrderStore();

  useEffect(() => { loadOrders(); }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadOrders} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              item.status === OrderStatus.IN_TRANSIT
                ? navigation.navigate('TrackingScreen', { order: item })
                : navigation.navigate('OrderDetailsScreen', { order: item })
            }
          >
            <Text>ID: {item.id}</Text>
            <Text>Sender: {item.sender}</Text>
            <Text>Recipient: {item.recipient}</Text>
            <Text>Status: {item.status} {item.isSynced ? '' : '(Pending)'}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateRequestScreen')}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 50,
  },
});
