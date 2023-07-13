import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import colors from '../config/colors';
import Bag from '../../assets/Bag.svg';

export default function CartButton() {
  const navigation = useRouter();
  return (
    <TouchableOpacity
      onPress={() => navigation.back()}
      style={{
        backgroundColor: colors.grey5,
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Bag />
    </TouchableOpacity>
  );
}

