import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Heart from '../../../assets/Heart.svg'
import Bag from '../../../assets/CartGray.svg'
import Wallet from '../../../assets/Wallet.svg'

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen name="home" options={{
        tabBarLabel: "Home",
        tabBarShowLabel: true,
        tabBarIcon: (props) => {
          return (
            <>
            </>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 15,
        }
      }} />
      <Tabs.Screen name="favorites" options={{
        tabBarLabel: "Favorites",
        tabBarIcon(props) {
          return (
            <Heart {...props} />
          );
        },
      }}
      />
      <Tabs.Screen name="cart" options={{
        tabBarLabel: "Cart",
        tabBarIcon(props) {
          return (
            <Bag {...props} />
          );
        },
      }}
      />
      <Tabs.Screen name="cards" options={{
        href: "/(tabs)/main/cart/payment",
        tabBarLabel: "Cards",
        tabBarIcon(props) {
          return (
            <Wallet {...props} />
          );
        },
      }}
      />
    </Tabs>
  );
}