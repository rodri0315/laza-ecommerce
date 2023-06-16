import React, { useContext } from 'react';
import { Button as EButton, ButtonProps, Text, useTheme, ThemeContext } from '@rneui/themed';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../config/colors';

type Props = TouchableOpacityProps & {
  selected?: boolean | null;
  text: string;
};

const Button = ({ text, selected, onPress }: Props) => {
  // const { theme } = useTheme();
  // const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity style={{
      backgroundColor: selected ? colors.primary : colors.grey5,
      padding: 20,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 5,
      borderRadius: 10,
    }}
      onPress={onPress}
    >
      <Text style={{
        color: selected ? colors.white : colors.grey3,
      }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
};

export default Button;