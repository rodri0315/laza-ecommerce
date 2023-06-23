import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, createTheme } from '@rneui/themed';
import useCachedResources from './hooks/useCachedResources';
import Onboarding from "./(auth)/onboarding";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './config/theme';
import SignIn from './signin';
import { AuthProvider } from './contexts/AuthContext';
import { Slot, Stack } from 'expo-router';


export default function App() {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Slot />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
