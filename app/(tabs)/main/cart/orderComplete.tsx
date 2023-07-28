// react native screen with title 

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { Button, Image } from '@rneui/themed';
import { useProducts } from '../../../contexts/ProductContext';
import { CheckmarkPhone } from '../../../components/ChechmarkPhone';
import { Circles } from '../../../../assets/orderComplete/Circles';
import colors from '../../../config/colors';
import { useRouter } from 'expo-router';


export default function OrderComplete() {

  // const { orders } = useProducts();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={{}}>
          <Image
            source={require('../../../../assets/MaskCircles.png')}
            style={{ width: 395, height: 340 }}
          />
        </View>
        <View style={{
          position: 'absolute',
          top: '31.5%',
          // left: '16%',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
          <CheckmarkPhone />
        </View>

      </View>
      <View style={styles.bottomContainer}>
        <View style={{
          marginHorizontal: 40,
        }}>
          <Text style={styles.orderTitle}>Order Confirmed</Text>
          <Text style={styles.orderDetails}>
            Your order has been confirmed, we will send you confirmation email shortly
          </Text>
        </View>
        {/* Go to orders fray button  */}
        <View style={styles.ordersButtonContainer}>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.ordersButton}
          >
            <Text style={styles.ordersButtonText}>Go to Orders</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => { router.replace({ pathname: '/(tabs)/main/home', }) }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // topHeader: {
  //   height: '20%',
  //   justifyContent: 'flex-end',
  //   paddingBottom: 10,
  //   paddingLeft: 10,
  // },
  // header:  
  imageContainer: {
    // height: '80%',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
    // alignContent: 'flex-end',
    // marginTop: 160,
  },
  orderDetails: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: colors.grey3,
    lineHeight: 20,
    marginTop: 20,
  },
  orderTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  ordersButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.grey5,
    paddingVertical: 20,
    marginTop: 80,
    borderRadius: 10,
  },
  ordersButtonText: {
    color: colors.grey3,
    fontSize: 17,
  },
  bottomContainer: {
    width: '100%',
    // justifyContent: 'flex-end',
  },
  ordersButtonContainer: {
    justifyContent: 'center',
    marginHorizontal: 40,
    marginVertical: 30,
  },
});