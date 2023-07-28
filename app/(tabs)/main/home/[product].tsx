import { Image } from '@rneui/themed';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useCurrentProduct } from '../../../contexts/ProductContext';
import BackButton from '../../../components/BackButton';
import CartButton from '../../../components/CartButton';
import colors from '../../../config/colors';
import { sizes } from '../../../helpers/constants';
import Review from '../../../components/review';
import { getReviews, useReviews } from '../../../contexts/review/ReviewContext';
import { useCart } from '../../../contexts/cart/CartContext';

export default function ProductDetail() {
  const router = useRouter();
  const { currentProduct: product } = useCurrentProduct()
  const [reviewState, reviewDispatch] = useReviews();
  const { cart, addProductToCart, removeProductFromCart } = useCart();
  const { reviews } = reviewState;

  useEffect(() => {
    getReviews(reviewDispatch, product?.id);
  }, [reviewDispatch]);

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* Image adn header */}
      <SafeAreaView>
        <View
          style={{
            justifyContent: 'space-around',
          }}
        >

          <View style={{
            height: 387,
          }}>
            <Image
              source={{ uri: product?.image_url ? product.image_url : 'https://via.placeholder.com/150x200' }}
              style={{ width: '100%', height: '100%' }}
              resizeMode='cover'
            />
            {/* Icons back and cart */}
            <View style={styles.headerIcons}>
              <BackButton />
              <CartButton />
            </View>
          </View>
          {/* Info and Description */}
          <View style={styles.namePriceSection}>
            <View style={styles.typeSection}>
              <Text style={styles.typeTitle}>{product?.type}</Text>
              <Text style={styles.nameTitle}>{product?.name}</Text>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.typeSubtitle}>Price</Text>
              <Text style={styles.nameTitle}>${product?.price}</Text>
            </View>
          </View>
          <View style={styles.images}>
            <ScrollView horizontal>
              {/* list of brands */}
              {
                product?.image_urls?.map((imageUrl, index) => {
                  return (
                    <View key={index} style={{
                      flexDirection: 'row',
                      backgroundColor: colors.grey5,
                      marginHorizontal: 5,
                    }}>
                      <Image source={{
                        uri: imageUrl ? imageUrl : 'https://via.placeholder.com/150',
                      }}
                        style={{
                          width: 77,
                          height: 77,
                          borderRadius: 10,
                        }}
                        resizeMode='cover'
                        containerStyle={{
                          backgroundColor: colors.white,
                        }}
                      />
                    </View>
                  )
                }
                )
              }
            </ScrollView>
          </View>
          {/* Size section */}
          <View>
            <View style={styles.namePriceSection}>
              <Text style={styles.sizeTitle}>Size</Text>
              <Text style={styles.sizeSubtitle}>Size Guide</Text>
            </View>
            <View style={styles.sizes} >
              {sizes.map((size, index) => {
                return (
                  <View
                    key={index}
                    style={styles.sizeContainer}
                  >
                    <Text style={styles.size}>{size}</Text>
                  </View>
                )
              })
              }
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product?.description}</Text>
          </View>
          {/* Reviews */}
          <View style={styles.reviews}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            <TouchableOpacity
              onPress={() => router.push('/main/reviews')}
            >
              <Text style={styles.reviewsText}>View All</Text>
            </TouchableOpacity>

          </View>
          {/* Review list */}
          <View style={{}}>
            <Review review={reviews[reviews.length - 1]} />
          </View>
          {/* Total Price */}
          <View style={styles.totalPrice}>
            <View style={styles.totalPriceSection}>
              <Text style={styles.totalPriceTitle}>Total Price</Text>
              <Text style={styles.totalPriceSubtitle}>with VAT,SD</Text>
            </View>
            <Text style={styles.totalPriceText}>${product?.price}</Text>
          </View>
          {/* Add to cart */}
          <View style={styles.addToCart}>
            <TouchableOpacity
              onPress={() => addProductToCart(product)}
              style={styles.addToCartButton}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  typeSection: {
    justifyContent: 'space-between',
  },
  typeTitle: {
    fontSize: 13,
    color: colors.grey3,
  },
  typeSubtitle: {
    fontSize: 13,
    color: colors.grey3,
  },
  sizeTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  sizeSubtitle: {
    fontSize: 15,
    color: colors.grey3,
  },
  priceSection: {
    justifyContent: 'space-between',
  },
  namePriceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  nameTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 5,
  },
  images: {
    marginHorizontal: 15,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  sizeContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.grey5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  size: {
    fontSize: 17,
    fontWeight: '600',
  },
  description: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 15,
    color: colors.grey3,
    paddingTop: 10,
  },
  reviews: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewsTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 13,
    color: colors.grey3,
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  totalPriceSection: {
    justifyContent: 'space-between',
  },
  totalPriceTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  totalPriceSubtitle: {
    fontSize: 13,
    color: colors.grey3,
  },
  totalPriceText: {
    fontSize: 17,
    fontWeight: '600',
  },
  addToCart: {
    marginTop: 20,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.white,
  },
});
