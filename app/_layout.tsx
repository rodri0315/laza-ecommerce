import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, createTheme } from '@rneui/themed';
import useCachedResources from './hooks/useCachedResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './config/theme';
import { AuthProvider } from './contexts/AuthContext';
import { Slot } from 'expo-router';
import { ProductProvider } from './contexts/ProductContext';
import ReviewState from './contexts/review/ReviewContext';
import { CartProvider } from './contexts/cart/CartContext';


export default function App() {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <ProductProvider>
              <CartProvider>
                <ReviewState>
                  <StatusBar />
                  <Slot />
                </ReviewState>
              </CartProvider>
            </ProductProvider>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
