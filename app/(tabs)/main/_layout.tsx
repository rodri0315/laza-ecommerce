import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="favorites" options={{ tabBarLabel: "Favorites" }} />
      <Tabs.Screen name="cart" options={{ tabBarLabel: "Cart" }} />
      <Tabs.Screen name="cards" options={{ tabBarLabel: "Cards" }} />
    </Tabs>
  );
}