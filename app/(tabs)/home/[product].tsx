import { Image } from '@rneui/themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCurrentProduct } from '../../contexts/ProductContext';

export default function ProductDetail(props) {
  const navigation = useNavigation();
  const product = navigation.getState().routes
  const params = useLocalSearchParams()
  const { currentProduct } = useCurrentProduct()
  console.log('params', params)
  console.log('props', props)
  console.log('## product', currentProduct)
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    }}>
      {/* Image adn header */}
      <View>
        <Text>{JSON.stringify(params)}</Text>
        <Image
          source={{ uri: currentProduct?.image_url ? currentProduct.image_url : 'https://via.placeholder.com/150x200' }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      {/* Info and Description */}
      <View></View>
      {/* Reviews */}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },
});
