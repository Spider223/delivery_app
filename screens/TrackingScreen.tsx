import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, AnimatedRegion, LatLng } from 'react-native-maps';
import { LocationService } from '../services/LocationService';

export default function TrackingScreen() {

  const coordinate = useRef(
    new AnimatedRegion({
      latitude: 27.7172,
      longitude: 85.3240,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  ).current;

  useEffect(() => {
    LocationService.startTracking();

    const interval = setInterval(() => {
      const newCoordinate: LatLng = {
        latitude: 27.7172 + (Math.random() - 0.5) * 0.01,
        longitude: 85.3240 + (Math.random() - 0.5) * 0.01,
      };

      coordinate.setValue({
        ...newCoordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

    }, 5000);

    return () => {
      clearInterval(interval);
      LocationService.stopTracking();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 27.7172,
          longitude: 85.3240,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker.Animated
          coordinate={coordinate}
          title="Delivery Vehicle"
        />
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.text}>Tracking Active</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 20,
  },
  text: { color: 'white', fontWeight: 'bold' },
});
