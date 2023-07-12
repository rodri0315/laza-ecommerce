// react native screen with title 

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Image } from '@rneui/themed';
import { useProducts } from '../../contexts/ProductContext';
import BackButton from '../../components/BackButton';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import colors from '../../config/colors';
import { useCart } from '../../contexts/cart/CartContext';

export default function Cart() {

  const { products } = useProducts();

  const { user, session, signOut } = useAuth();
  const { cart, removeProductFromCart, getAddresses, address } = useCart();
  const router = useRouter();

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
      </View>
      {/* product cart card */}
      <ScrollView
        style={styles.scrollView}
      >
        {
          cart.map((product, index) => {
            const isOdd = index % 2 === 0;
            return (
              <View
                key={product.id}
                style={isOdd ? styles.cardContainerWhite : styles.cardContainer}
              >
                <Image
                  source={{ uri: product?.image_url ? product.image_url : 'https://picsum.photos/200/300' }}
                  style={{
                    width: 100,
                    height: 100,
                    margin: 10,
                    borderRadius: 10,
                  }}
                />
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  margin: 10,
                }}>
                  <View>
                    <Text style={styles.productText}>{product.type}</Text>
                    <Text style={styles.productText}>{product.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.priceText}>${product.price}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 100,
                  }}>
                    <TouchableOpacity
                      onPress={() => subtractProductFromCart(product)}
                    >
                      <View style={styles.iconContainer}>
                        <Octicons name="chevron-down" size={15} color={colors.grey3} />
                      </View>
                    </TouchableOpacity>
                    <Text>{product.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => addProductToCart(product)}
                    >
                      <View style={styles.iconContainer}>
                        <Octicons name="chevron-up" size={15} color={colors.grey3} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{
                  justifyContent: 'flex-end',
                  marginRight: 10,
                  marginBottom: 10,
                  marginLeft: 10,
                }}>
                  <TouchableOpacity onPress={() => removeProductFromCart(product)}>
                    <View style={styles.iconContainer}>
                      <Octicons name="trash" size={16} color={colors.grey3} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )

          })
        }
      </ScrollView>

      {/* Address */}
      <View style={styles.deliveryContainer}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart/addressList')}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressHeaderText}>Delivery Address</Text>
            <Octicons name="chevron-right" size={24} color={colors.black} />
          </View>
        </TouchableOpacity>
        <View style={styles.address}>
          <Image
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={{
              width: 50,
              height: 50,
              margin: 10,
              borderRadius: 10,
            }}
          />
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{address?.address}</Text>
            <Text style={styles.cityText}>{address?.city}, {address?.country}</Text>
          </View>
          <View style={styles.checkmark}>
            {
              address && (
                <Octicons name="check-circle-fill" size={24} color={colors.secondary} />
              )
            }
          </View>
        </View>
      </View>
      {/* Card Info*/}
      <View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart/payment')}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressHeaderText}>Payment Method</Text>
            <Octicons name="chevron-right" size={24} color={colors.black} />
          </View>
        </TouchableOpacity>
        <View style={styles.address}>
          <Image
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={{
              width: 50,
              height: 50,
              margin: 10,
              borderRadius: 10,
            }}
          />
          <View style={styles.addressContainer}>
            {CardNumberInfo()}
          </View>
          <View style={styles.checkmark}>
            {
              selectedCard && (
                <Octicons name="check-circle-fill" size={24} color={colors.secondary} />
              )
            }
          </View>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.oderInfo}>Order Info</Text>
        <View style={styles.orderRow}>
          <Text style={styles.orderLeftText}>Subtotal</Text>
          <Text style={styles.orderRightText}>$ 100</Text>
        </View>
        {/* shipping cost row */}
        <View style={styles.orderRow}>
          <Text style={styles.orderLeftText}>Shipping cost  </Text>
          <Text style={styles.orderRightText}>$ 10</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.orderLeftText}>Total</Text>
          <Text style={styles.orderRightText}>$ 100</Text>
        </View>
      </View>
      <Button title="Checkout"
        onPress={() => router.push({ pathname: '/(tabs)/cart/address' })} />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topHeader: {
    height: '20%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  productText: {
    fontSize: 13,
    fontWeight: '500',
  },
  iconContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.grey4,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 11,
    color: colors.grey3,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    backgroundColor: colors.grey6,
    borderRadius: 10,
    marginTop: 20,
  },
  cardContainerWhite: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  deliveryContainer: {
    marginTop: 10,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  addressHeaderText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  addressContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  addressText: {
    fontSize: 15,
    flexWrap: 'wrap',
    width: 220,
  },
  cityText: {
    fontSize: 13,
    flexWrap: 'wrap',
    color: colors.grey3,
    marginTop: 5,
  },
  checkmark: {
    justifyContent: 'center',
  },
  totalContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  oderInfo: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orderLeftText: {
    fontSize: 15,
    color: colors.grey3,
  },
  orderRightText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
  },
});

