import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import colors from '../config/colors';

export default function BackButton() {
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
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
}

