import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainRouter from './components/core/MainRouter';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import merge from 'deepmerge';
import { useEffect } from 'react';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <SafeAreaProvider>
        <MainRouter />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
