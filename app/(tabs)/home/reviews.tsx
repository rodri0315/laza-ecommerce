import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Review from '../../components/review';
import BackButton from '../../components/BackButton';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Reviews() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Reviews</Text>
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>

        <View style={styles.reviewsInfo}>
          <View style={styles.reviewsRating}>
            <Text style={styles.reviewsCount}>245 Reviews</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>4.5</Text>
              <View style={styles.reviewStars}>
                <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
                <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
                <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
                <MaterialCommunityIcons name="star" size={16} color={colors.orange} />
              </View>

            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/home/addReview')}>
            <View style={styles.addReviewButton}>
              <FontAwesome5 name="edit" size={13} color={colors.white} />
              <Text style={styles.addReviewButtonText}>Add Review</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.reviewListContainer}>
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </ScrollView>
      </View>
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
    backgroundColor: colors.orange,
    paddingVertical: 5,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addReviewButtonText: {
    color: colors.white,
    fontSize: 13,
    marginLeft: 5,
  },
  reviewListContainer: {
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
});
