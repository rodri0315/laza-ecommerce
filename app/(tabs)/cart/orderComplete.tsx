import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface OrderCompleteProps { }

const OrderComplete = (props: OrderCompleteProps) => {
  return (
    <View style={styles.container}>
      <Text>OrderComplete</Text>
    </View>
  );
};

export default OrderComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
