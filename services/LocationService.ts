import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Background Location Error:', error);
    return;
  }
  if (data) {
    const { locations } = data as any;
    console.log('[Background Location]', locations[0]?.coords);
    // You can send coordinates to backend here
  }
});

export const LocationService = {
  requestPermissions: async () => {
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
    if (fgStatus !== 'granted') return false;
    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    return bgStatus === 'granted';
  },

  startTracking: async () => {
    const hasPerms = await LocationService.requestPermissions();
    if (!hasPerms) return;
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
    if (!hasStarted) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: 'Delivery Tracking',
          notificationBody: 'Tracking your delivery in background',
        },
      });
    }
  },

  stopTracking: async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
    if (hasStarted) await Location.stopLocationUpdatesAsync(LOCATION_TASK);
  },
};
