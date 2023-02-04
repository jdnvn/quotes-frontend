import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainRouter from './components/core/MainRouter';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <SafeAreaProvider>
        <MainRouter />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
