// react native screen with title 

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Image, Switch } from '@rneui/themed';
import { useProducts } from '../../contexts/ProductContext';
import BackButton from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import colors from '../../config/colors';
import { useRouter } from 'expo-router';
import { useCart } from '../../contexts/cart/CartContext';

export default function Payment() {

  const [saveCard, setSaveCard] = useState(false);
  const { products } = useProducts();
  const { cards } = useCart()
  const router = useRouter();
  const { user, session, signOut } = useAuth();
  const toggleSwitch = () => setSaveCard(previousState => !previousState);

  useEffect(() => {
    console.log('cards', cards);
  }, [cards]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            alignSelf: cards.length > 1 ? undefined : 'center',
          }}
        >
          {/* list of cards, later get from stripe api or db */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            {
              cards.map((card, index) => (
                <Image
                  key={index}
                  style={{
                    width: 300,
                    height: 185,
                    margin: 10,
                    borderRadius: 10,
                  }}
                  source={{ uri: 'https://picsum.photos/200/300' }}>
                  <View>
                    {/* row */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 20,
                    }}>
                      <Text style={styles.cardOwnerName}>{card.card_owner}</Text>
                      {/* Visa image */}
                      <Image
                        style={{
                          width: 40,
                          height: 30,
                        }}
                        source={{ uri: 'https://picsum.photos/200/300' }} />
                    </View>
                    {/* row */}
                    <View style={styles.cardTypeContainer}>
                      <Text style={styles.cardType}>Visa Classic</Text>
                    </View>
                    {/* row  of card number*/}
                    <View style={styles.cardNumberContainer}>
                      <Text style={styles.cardNumber}>**** **** **** 1234</Text>
                    </View>
                    {/* row  of exp*/}
                    <View style={styles.cardExpContainer}>
                      <Text style={styles.cardExp}>Exp: 12/22</Text>
                    </View>
                  </View>
                </Image>

              ))
            }

          </View>

        </ScrollView>
      </View>
      <View>
        {/* add new card button */}
        <TouchableOpacity style={{
          backgroundColor: colors.primary1,
          borderColor: colors.primary,
          borderWidth: 1,
          margin: 20,
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
          onPress={() => router.push('/(tabs)/cart/addNewCard')}
        >
          {/* + icon */}
          <Feather name="plus-square" size={15} color={colors.primary} />
          <Text style={{
            color: colors.primary,
            marginLeft: 10,
          }}>Add New Card</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* list of products */}
        {
          products.map((product, index) => {
            return (
              <Text key={index}>{product.name}</Text>
            )
          }
          )
        }
      </View>
      <View style={styles.toggle}>
        <Text style={styles.toggleText}>Save card info</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={saveCard}
          style={styles.toggleSwitch}
          trackColor={{ false: colors.grey3, true: colors.secondary3 }}
        />
      </View>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  topHeader: {
    height: '20%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
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
  toggleSwitch: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '500',
  },
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
});