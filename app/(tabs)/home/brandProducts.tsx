import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Formik, useFormik, useFormikContext } from 'formik';
import BackButton from '../../components/BackButton';
import colors from '../../config/colors';
import CartButton from '../../components/CartButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from '@rneui/themed';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../contexts/ProductContext';

export default function BrandProducts() {

  const [loading, setLoading] = useState(false);

  const { brandProducts: products, selectedBrand: brand } = useProducts();

  useEffect(() => {

  }, [brand, products])

  if (!brand || !products) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />

        <Image source={{
          uri: brand?.logo_url ? brand.logo_url : 'https://via.placeholder.com/150',
        }}
          style={styles.brandImage}
          resizeMode='contain'
          containerStyle={styles.brandImageContainer}
        />

        <CartButton />
      </View>
      <View style={styles.itemSection}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{products.length} Items</Text>
          <Text style={styles.itemDescription}>Available in stock</Text>
        </View>
        <TouchableOpacity style={styles.sortButton}>
          <MaterialIcons name="sort" size={18} color="black" />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardList}>
        {
          products.map((product, index) => {
            return <ProductCard key={product.id} product={product} index={index} />
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  reviewsCount: {
    fontSize: 15,
    fontWeight: '500',
  },
  reviewsRating: {
    // justifyContent: 'flex-start',
    // textAlign: 'left',
    // alignContent: 'flex-start',
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start',  
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  addReviewButton: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    padding: 20,
    alignItems: 'center',
  },
  addReviewButtonText: {
    color: colors.white,
    fontSize: 13,
    marginLeft: 5,
  },
  reviewListContainer: {
    marginTop: 10,
  },
  reviewInput: {
    // height: 180,
  },
  backButton: {

  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  formContainer: {
    marginTop: 20,
    flexGrow: 1,
    // backgroundColor: colors.grey1,
  },
  input: {
    padding: 10,
    backgroundColor: colors.grey5,
    borderBottomWidth: 0,
    borderEndColor: 'transparent',
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputsContainer: {
    marginHorizontal: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
    color: colors.black,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  itemTextContainer: {},
  itemTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 15,
    color: colors.grey3,
  },
  sortButton: {
    flexDirection: 'row',
    backgroundColor: colors.grey5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5,
  },
  brandImage: {
    width: 48,
    height: 25,
    margin: 10,
  },
  brandImageContainer: {
    backgroundColor: colors.grey5,
    borderRadius: 10,
  },
});
