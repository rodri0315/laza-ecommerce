import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from "expo-router";
import colors from '../config/colors';
import { DrawerActions } from '@react-navigation/native';

export default function MenuButton() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{
        backgroundColor: colors.grey5,
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name="menu-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}

