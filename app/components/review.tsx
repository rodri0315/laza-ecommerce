import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { Review as ReviewRowProps } from '../contexts/ProductContext';
import dayjs from 'dayjs';

interface ReviewProps {
  review: ReviewRowProps;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const getStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<MaterialCommunityIcons key={i} name="star" size={16} color={colors.orange} />)
    }
    return stars;
  }
  if (!review) return null;
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
              <Text style={styles.reviewUserName}>{review?.user_name}</Text>
              <View style={styles.reviewDate}>
                <MaterialCommunityIcons name="clock-outline" size={16} color={colors.grey3} />
                <Text style={styles.reviewDateText}>{dayjs(review?.created_at).format('D MMM, YYYY')}</Text>
              </View>
            </View>
          </View>
          {/* review rating */}
          <View>
            <View style={styles.reviewHeaderRight}>
              <Text style={styles.reviewRating}>{review.rating}</Text>
              <Text style={styles.reviewRatingText}>rating</Text>
            </View>
            <View style={styles.reviewStars}>
              {getStars(review.rating)}
            </View>
          </View>
        </View>
        <View style={styles.reviewBody}>
          <Text style={styles.reviewText}>{review?.comment}</Text>
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
    marginTop: 5,
  },
  reviewDateText: {
    fontSize: 13,
    color: colors.grey3,
    marginLeft: 5,
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