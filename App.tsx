// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderListScreen from './screens/OrderListScreen';
import CreateRequestScreen from './screens/CreateRequestScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import TrackingScreen from './screens/TrackingScreen';
import PaymentScreen from './screens/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OrderListScreen">
        <Stack.Screen name="OrderListScreen" component={OrderListScreen} options={{ title: 'Orders' }} />
        <Stack.Screen name="CreateRequestScreen" component={CreateRequestScreen} options={{ title: 'New Delivery' }} />
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{ title: 'Order Details' }} />
        <Stack.Screen name="TrackingScreen" component={TrackingScreen} options={{ title: 'Tracking' }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
