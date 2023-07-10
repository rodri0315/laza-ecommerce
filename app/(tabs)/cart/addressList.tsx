import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../../config/colors';
import BackButton from '../../components/BackButton';
import { useRouter } from 'expo-router';
import { useCart } from '../../contexts/cart/CartContext';

export default function AddressList() {
  const router = useRouter();
  const { addresses } = useCart()
  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Address List</Text>
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
      </View>
      <View style={{ flexGrow: 1 }}>
        <View style={styles.address}>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Jorge Rod</Text>
            <Text style={styles.addressText}>123 main st, Durham, NC, 27771</Text>
            <Text style={styles.cityText}>**** 7690</Text>
          </View>
        </View>
        <View style={styles.address}>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Jorge Rod</Text>
            <Text style={styles.addressText}>123 main st, Durham, NC, 27771</Text>
            <Text style={styles.cityText}>**** 7690</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push('/cart/address')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add New Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
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
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  addressContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: colors.grey5,
    backgroundColor: colors.grey5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    flexGrow: 1,
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
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
});
