// react native screen with title 

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { Button, Image, Input, Switch } from '@rneui/themed';
import { useProducts } from '../../../contexts/ProductContext';
import BackButton from '../../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import colors from '../../../config/colors';
import { useRouter } from 'expo-router';
import { useCart } from '../../../contexts/cart/CartContext';
import { Card } from '../../../types/global';
import { Formik } from 'formik';
import PaymentCard from '../../../components/PaymentCard';

export default function Payment() {

  const [saveCard, setSaveCard] = useState(false);
  const { cards } = useCart()
  const router = useRouter();
  const { user } = useAuth();
  const { submitCard } = useCart();
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
          style={{ alignSelf: cards.length > 1 ? undefined : 'center' }}
        >
          {/* list of cards, later get from stripe api or db */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          >
            {
              cards.map((card, index) => (
                <PaymentCard
                  key={index}
                  card={card}
                  submitCard={submitCard}
                  router={router}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>

      <View>
        {/* add new card button */}
        <TouchableOpacity style={styles.addNewCardButton}
          onPress={() => router.push('/(tabs)/main/cart/addNewCard')}
        >
          <Feather name="plus-square" size={15} color={colors.primary} />
          <Text style={styles.addNewCardText}>Add New Card</Text>
        </TouchableOpacity>
      </View>
      <Formik
        initialValues={{
          // get a uuid for the card id or save cards in db
          id: Math.floor(Math.random() * 1000000000).toString(),
          card_owner: 'George W',
          card_number: '5254 5454 5454 5454',
          exp: '12/22',
          cvv: '7763',
          save_card: saveCard,
          user_id: user?.id!,
        }}
        onSubmit={async (values) => {
          // setLoading(true);
          try {
            // if (error) throw error
            console.log('values submitting CARD', values)
            submitCard({ ...values }, router);
          } catch (err) {
            console.log('Error', err)
            throw err;
          } finally {
            // setLoading(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
            <View style={{}}>
              <View style={styles.formContainer}>
                <View style={styles.inputsContainer}>
                  <Input
                    onChangeText={handleChange('card_owner')}
                    onBlur={handleBlur('card_owner')}
                    label="Card Owner"
                    value={values.card_owner}
                    placeholder="Card Owner"
                    inputContainerStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                  />

                  <Input
                    onChangeText={handleChange('card_number')}
                    onBlur={handleBlur('card_number')}
                    label="Card Number"
                    value={values.card_number}
                    placeholder="**** **** **** 5511"
                    textAlignVertical='top'
                    inputContainerStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    keyboardType='numeric'
                  />
                  {/* row of two inpues */}
                  <View style={styles.row}>
                    <View style={styles.rowInput}>
                      <Input
                        onChangeText={handleChange('exp')}
                        onBlur={handleBlur('exp')}
                        label="Exp"
                        value={values.exp}
                        placeholder="12/23"
                        inputContainerStyle={styles.input}
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                      />
                    </View>
                    <View style={styles.rowInput}>
                      <Input
                        onChangeText={handleChange('cvv')}
                        onBlur={handleBlur('cvv')}
                        label="CVV"
                        value={values.cvv}
                        placeholder="432"
                        textAlignVertical='top'
                        inputContainerStyle={styles.input}
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                      />
                    </View>
                  </View>

                </View>
              </View>
            </View>
            {/* submit button */}
            <View style={styles.toggle}>
              <Text style={styles.toggleText}>Save card info</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={saveCard}
                style={styles.toggleSwitch}
                trackColor={{ false: colors.grey3, true: colors.secondary3 }}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
    top: -10,
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
    marginTop: 5,
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
  formContainer: {
    marginTop: 10,
    flexGrow: 1,
  },
  input: {
    padding: 7,
    backgroundColor: colors.grey5,
    borderBottomWidth: 0,
    borderEndColor: 'transparent',
    borderRadius: 5,
  },
  inputContainer: {

  },
  inputsContainer: {
    marginHorizontal: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    width: '50%',
  },
  toggleSwitch: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
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
  addNewCardButton: {
    backgroundColor: colors.primary1,
    borderColor: colors.primary,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addNewCardText: {
    color: colors.primary,
    marginLeft: 10,
  },
});