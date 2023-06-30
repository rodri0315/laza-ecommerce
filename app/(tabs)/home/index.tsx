// react native screen with title 

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card, Image, Input, SearchBar } from '@rneui/themed';
import { useProducts } from '../../contexts/ProductContext';
import MenuButton from '../../components/MenuButton';
import CartButton from '../../components/CartButton';
import colors from '../../config/colors';
import ProductCard from '../../components/ProductCard';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {

  const { products, brands } = useProducts();

  const { user } = useAuth();

  const router = useRouter();


  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topHeader}>
          <View style={styles.headerIcons}>
            <MenuButton />
            <CartButton />
          </View>
        </View>

        <View>
          <Text style={styles.header}>Hello</Text>
          <Text style={styles.subtitle}>{user?.email}</Text>
          <Text style={styles.subtitle}>Welcome to Laza</Text>
        </View>
        <View style={styles.searchBar}>
          {/* Search bar for products */}
          <SearchBar
            placeholder="Search..."
            leftIcon={{ name: 'search' }}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
          />
          {/* microphone icon button */}
          <TouchableOpacity
            style={styles.microphoneButton}
          >
            <MaterialCommunityIcons name="microphone-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Choose brand section */}
        <View>
          <View style={styles.brandSection}>
            <Text style={styles.sectionTitle}>Choose Brand</Text>
            <Text style={styles.sectionSubtitle}>View All</Text>
          </View>
          <ScrollView horizontal>
            {/* list of brands, create own component */}
            {
              brands.map((brand, index) => {
                return (
                  <View key={index} style={{
                    flexDirection: 'row',
                    backgroundColor: colors.grey5,
                    borderRadius: 10,
                    padding: 10,
                    marginHorizontal: 5,
                  }}>
                    <TouchableOpacity
                      onPress={() => router.push({
                        pathname: '/(tabs)/home/brandProducts',
                      })}
                    >
                      <Image source={{
                        uri: brand.logo_url ? brand.logo_url : 'https://via.placeholder.com/150',
                      }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          margin: 6,
                        }}
                        resizeMode='contain'
                        containerStyle={{
                          backgroundColor: colors.white,
                          borderRadius: 10,
                        }}
                      />
                    </TouchableOpacity>
                    <Text style={{
                      marginLeft: 10,
                      alignSelf: 'center',
                      fontSize: 15,
                    }}>{brand.name}</Text>
                  </View>
                )
              }
              )
            }
          </ScrollView>
        </View>
        <View>
          <View style={styles.brandSection}>
            <Text style={styles.sectionTitle}>New Arrival</Text>
            <Text style={styles.sectionSubtitle}>View All</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.cardList}>
        {
          products.map((product, index) => {
            return <ProductCard product={product} index={index} />
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  topHeader: {
    height: '15%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: colors.grey3,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  searchBar: {
    marginTop: 20,
    flexDirection: 'row',
  },
  brandSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.grey3,
  },
  topSection: {
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchBarContainer: {
    backgroundColor: colors.white,
    borderTopColor: colors.white,
    borderBottomColor: colors.white,
    flexGrow: 1,
  },
  searchBarInputContainer: {
    borderRadius: 10,
  },
  microphoneButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});