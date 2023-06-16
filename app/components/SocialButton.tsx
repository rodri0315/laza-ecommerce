import React, { useContext } from 'react';
import { Text } from '@rneui/themed';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../config/colors';

type Props = TouchableOpacityProps & {
  text: string;
  color: string;
};

const SocialButton = ({ text, onPress, color }: Props) => {

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    minWidth: '90%',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 17,
  }
});

export default SocialButton;