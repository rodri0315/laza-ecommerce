import React from 'react'
import Svg, { SvgProps, Path } from "react-native-svg"
import { Link, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image, Text } from '@rneui/themed';
import colors from '../config/colors';
import { Fontisto, Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Menu from '../../assets/menu.svg';


export default function MainLayout() {
  const pathname = usePathname();
  return (
    <Drawer
      screenOptions={{
        drawerPosition: "left",
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <View style={styles.container}>
            <View style={{
              marginBottom: 80,
            }}>
              <TouchableOpacity
                onPress={() => props.navigation.toggleDrawer()}
                style={styles.menuIcon}>
                <Menu />
              </TouchableOpacity>
              <View style={styles.header}>
                {/* image, name, order count button gray */}
                <View style={styles.profileSection}>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                  />
                  <View style={styles.profileInfo}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.verified}>Verified Profile</Text>
                  </View>
                  <View style={styles.orderCountButton}>
                    <Text style={styles.orderCountText}>3 Orders</Text>
                  </View>
                </View>
              </View>
              <View style={styles.linkRow}>
                <Fontisto name="day-sunny" size={24} color="black" />
                <Link
                  style={styles.link}
                  href="/main/home">Dark Mode
                </Link>
              </View>
              <View style={styles.linkRow}>
                <AntDesign name="exclamationcircleo" size={24} color="black" />
                <Link
                  style={styles.link}
                  href="/main/home">Account Information</Link>
              </View>

              <View style={styles.linkRow}>
                <SimpleLineIcons name="lock" size={24} color="black" />
                <Link
                  style={styles.link}
                  href="/main/home">Password
                </Link>
              </View>

              <View style={styles.linkRow}>
                <SimpleLineIcons name="handbag" size={24} color="black" />
                <Link
                  style={styles.link}
                  href="/main/home">Order
                </Link>
              </View>

              <View style={styles.linkRow}>
                <AntDesign name="wallet" size={24} color="black" />
                <Link
                  style={styles.link}
                  href="/main/home">My Cards
                </Link>
              </View>

              <View style={styles.linkRow}>
                <Fontisto name="heart-alt" size={24} color="black" />
                <Link
                  style={styles.link}
                  href="/main/home">Wishlist
                </Link>
              </View>

              <View style={styles.linkRow}>
                <Octicons name="gear" size={24} color="black" />
                <Link
                  style={styles.link}
                  href="/main/home">Settings
                </Link>
              </View>

              <Link
                href="/main/"
                // Use `pathname` to determine if the link is active.
                style={[pathname === "/main" && { color: "blue" }]}
              >
                Profile
              </Link>
            </View>
            <View>
              {/* link to logout, red text, icon on left */}
              <Text>Logout</Text>
            </View>
          </View>
        );
      }}
      useLegacyImplementation={false}
    >
      <Drawer.Screen name="main" />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 40,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  link: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '400',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
  },
  verified: {
    fontSize: 12,
    color: colors.grey3,
  },
  orderCountButton: {
    backgroundColor: colors.grey6,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  orderCountText: {
    fontSize: 12,
    color: colors.grey3,
  },
  menuIcon: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: colors.grey6,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});
