import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Product, useCurrentProduct, useProducts } from '../contexts/ProductContext';
import { Image } from '@rneui/themed';
import { useRouter } from 'expo-router';
import Heart from '../../assets/Heart.svg';

export default function ProductCard(
  { product, index, isFavorite = false }:
    { product: Product, index: number, isFavorite?: boolean }
) {
  const router = useRouter();
  const isEven = index % 2 === 0;
  const { setCurrentProduct } = useCurrentProduct();
  const { toggleFavorite } = useProducts();
  return (
    <View style={styles.cardContainer} >
      <TouchableOpacity
        onPress={() => toggleFavorite(product)}
        style={{
          position: 'absolute',
          zIndex: 1,
          right: isEven ? 28 : 31,
          top: 22,
        }}>
        <View style={styles.heart}>
          {
            isFavorite ?
              <Heart fill='#9775FA' /> :
              <Heart />
          }
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCurrentProduct(product);
          router.push({
            pathname: `/(tabs)/main/[${product.id}]`,
          })
        }
        }
        style={[styles.card, { paddingLeft: isEven ? 10 : 0 }]}>
        <Image
          source={{ uri: product.image_url ? product.image_url : 'https://via.placeholder.com/150x200' }}
          style={styles.cardImage}
        />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardName}>{product.name}</Text>
          <Text style={styles.cardPrice}>${product.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 257,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 0,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '50%',
    flexDirection: "row",
  },
  cardImage: {
    borderRadius: 15,
    width: 160,
    height: 200,
  },
  cardTextContainer: {
    width: 160,
    paddingTop: 5,
    height: '25%',
    alignContent: 'flex-start',
  },
  cardName: {
    fontSize: 11,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '600',
  },
});

// const ProductCard = ({ product, index }) => { const isEven = index % 2 === 0; const imageUrl = product.image_url ? product.image_url : 'https://via.placeholder.com/150x200'; return (<View style={[styles.card, { paddingLeft: isEven ? 10 : 0 }]}> <Image source={{ uri: imageUrl }} style={styles.cardImage} /> {product.name} ${product.price} ); }