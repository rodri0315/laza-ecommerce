import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import colors from '../config/colors';
import Bag from '../../assets/Bag.svg';
import { Text } from '@rneui/themed';
import { View } from 'react-native';
import { useCart } from '../contexts/cart/CartContext';

export default function CartButton() {
  const navigation = useRouter();
  const { cart } = useCart();
  return (
    <TouchableOpacity
      onPress={() => navigation.replace('/main/cart')}
      style={{
        backgroundColor: colors.grey5,
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Bag />
      {/* number of products in cart */}
      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: colors.facebook,
        borderRadius: 50,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: colors.white, fontSize: 10 }}>{cart.length}</Text>
      </View>
    </TouchableOpacity>
  );
}

