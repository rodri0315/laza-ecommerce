// react native screen with title 

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card, Image, Input, SearchBar } from '@rneui/themed';
import { useProducts } from '../../contexts/ProductContext';
import MenuButton from '../../components/MenuButton';
import CartButton from '../../components/CartButton';
import colors from '../../config/colors';
import ProductCard from '../../components/ProductCard';
// import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {

  const { products, brands } = useProducts();

  const { user, session, signOut } = useAuth();


  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topHeader}>
          <View style={styles.headerIcons}>
            <MenuButton />
            <CartButton />
          </View>

        </View>
        <View
          style={{}}
        >
          <Text style={styles.header}>Hello</Text>
          <Text style={styles.subtitle}>{user?.email}</Text>
          <Text style={styles.subtitle}>Welcome to Laza</Text>
        </View>
        <View style={styles.searchBar}>
          {/* Search bar for products */}
          <SearchBar
            placeholder="Search"
            leftIcon={{ name: 'search' }}
          />
        </View>

        {/* Choose brand section */}
        <View>
          <View style={styles.brandSection}>
            <Text style={styles.sectionTitle}>Choose Brand</Text>
            <Text style={styles.sectionSubtitle}>View All</Text>
          </View>
          <ScrollView horizontal>
            {/* list of brands */}
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
                    <View style={{
                      // width: 40,
                      // height: 40,
                      // backgroundColor: colors.white,
                    }}>
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
                    </View>
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
});