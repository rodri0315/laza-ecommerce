import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import colors from '../config/colors';

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
      <SimpleLineIcons name="handbag" size={24} color="black" />
    </TouchableOpacity>
  );
}

