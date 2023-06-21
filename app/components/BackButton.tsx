import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import React from 'react';
import { View, Text } from 'react-native';

export default function BackButton() {
  const navigation = useRouter();
  return (
    <TouchableOpacity
      onPress={() => navigation.back()}
      style={{
        backgroundColor: 'lightgrey',
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

