import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

interface ReviewProps {
  // props

}

const Review: React.FC<ReviewProps> = () => {
  return (
    <View style={styles.reviewsList}>
      <View style={styles.review}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewHeaderLeft}>
            {/* circular image */}
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.reviewImage}
              resizeMode='cover'
            />
            <View style={styles.reviewUserInfo}>
              <Text style={styles.reviewUserName}>Ronald Richards</Text>
              <View style={styles.reviewDate}>
                {/* clock logo */}
                <MaterialCommunityIcons name="clock-outline" size={16} color={colors.grey3} />
                <Text style={styles.reviewDateText}>13 Sep, 2020</Text>
              </View>
            </View>
          </View>
          {/* review rating */}
          <View>
            <View style={styles.reviewHeaderRight}>
              <Text style={styles.reviewRating}>4.5</Text>
              <Text style={styles.reviewRatingText}>rating</Text>
              {/* review stars */}
            </View>
            <View style={styles.reviewStars}>
              <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
              <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
              <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
              <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
            </View>
          </View>
        </View>
        <View style={styles.reviewBody}>
          <Text style={styles.reviewText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...</Text>
        </View>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
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
  reviewsList: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  review: {},
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewHeaderLeft: {
    flexDirection: 'row',
  },
  reviewHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewTitle: {},
  reviewSubtitle: {},
  reviewUserInfo: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  reviewUserName: {
    fontSize: 15,
    fontWeight: '600',
  },
  reviewDate: {
    flexDirection: 'row',
  },
  reviewDateText: {
    fontSize: 13,
    color: colors.grey3,
  },
  reviewBody: {},
  reviewText: {
    fontSize: 15,
    color: colors.grey3,
    paddingTop: 10,
  },
  reviewImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewRating: {
    fontSize: 17,
    fontWeight: '600',
  },
  reviewRatingText: {
    fontSize: 13,
    color: colors.grey3,
    marginLeft: 10,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
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