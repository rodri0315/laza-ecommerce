import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, createTheme } from '@rneui/themed';
import useCachedResources from './hooks/useCachedResources';
import Onboarding from "./onboarding";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './config/theme';


export default function App() {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Onboarding />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

