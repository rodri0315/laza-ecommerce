import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Card, Router } from '../types/global';
import { Image } from '@rneui/themed';
import { CartContextProps } from '../contexts/cart/CartContext';
import colors from '../config/colors';

type PaymentCardProps = {
  card: Card;
  router: Router;
  submitCard: CartContextProps['submitCard'];
}

export default function PaymentCard({ card, router, submitCard }: PaymentCardProps) {
  return (
    <TouchableOpacity onPress={() => submitCard(card, router)}>
      <Image
        style={styles.cardImage}
        source={{ uri: 'https://picsum.photos/200/300' }}
      >
        <View>
          {/* row */}
          <View style={styles.cardRow}>
            <Text style={styles.cardOwnerName}>{card.card_owner}</Text>
            {/* Visa image */}
            <Image
              style={{
                width: 40,
                height: 30,
              }}
              source={{ uri: 'https://picsum.photos/200/300' }}
            />
          </View>
          {/* row */}
          <View style={styles.cardTypeContainer}>
            <Text style={styles.cardType}>Visa Classic</Text>
          </View>
          {/* row  of card number*/}
          <View style={styles.cardNumberContainer}>
            <Text
              style={styles.cardNumber}>
              **** **** **** {card.card_number.slice(card.card_number.length - 4)}
            </Text>
          </View>
          {/* row  of exp*/}
          <View style={styles.cardExpContainer}>
            <Text style={styles.cardExp}>Exp: {card.exp}</Text>
          </View>
        </View>
      </Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardOwnerName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
  },
  cardType: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
  },
  cardNumber: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.white,
  },
  cardExp: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 8,
  },
  cardExpContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 15,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardImage: {
    width: 300,
    height: 185,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
});
