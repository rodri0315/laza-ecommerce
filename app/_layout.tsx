import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import useCachedResources from './hooks/useCachedResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './config/theme';
import { AuthProvider } from './contexts/AuthContext';
import { Slot } from 'expo-router';
import { ProductProvider } from './contexts/ProductContext';
import ReviewState from './contexts/review/ReviewContext';
import { CartProvider } from './contexts/cart/CartContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const { isLoadingComplete, publishableKey } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <StripeProvider publishableKey={publishableKey}>
              <ProductProvider>
                <CartProvider>
                  <ReviewState>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                      <StatusBar />
                      <Slot />
                    </GestureHandlerRootView>
                  </ReviewState>
                </CartProvider>
              </ProductProvider>
            </StripeProvider>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
