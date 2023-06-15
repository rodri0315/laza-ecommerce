import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import useCachedResources from './hooks/useCachedResources';
import Example from "./components/Example";
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
          <Example />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

