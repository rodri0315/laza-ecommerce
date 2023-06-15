import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text, ThemeProvider } from 'react-native-elements';
import useCachedResources from './hooks/useCachedResources';
import Example from "./components/Example";


export default function App() {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider>
        <Example />
      </ThemeProvider>
    );
  }
}

