// react native screen with title 

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Image, Input, Switch } from '@rneui/themed';
import { useProducts } from '../../contexts/ProductContext';
import BackButton from '../../components/BackButton';
import { Formik } from 'formik';
import colors from '../../config/colors';
import { useCart } from '../../contexts/cart/CartContext';
import { useRouter } from 'expo-router';
import { CardField } from '@stripe/stripe-react-native';

export default function Address() {
  const router = useRouter();
  const [isPrimary, setIsPrimary] = useState(false);
  const [selected, setSelected] = useState<'card' | 'paypal' | 'applepay'>('card');
  const { user, session, signOut } = useAuth();
  const { submitCard } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Add New Card</Text>
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
      </View>
      <View style={{
        marginHorizontal: 20,
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <View style={[styles.paymentLogo, {
          backgroundColor: selected === 'card' ? colors.secondary2 : colors.white,
          borderColor: selected === 'card' ? colors.orange : colors.grey5,
          borderWidth: 1
        }]}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/(tabs)/home/brandProducts',
              })
            }}
          >
            <Image source={{ uri: 'https://via.placeholder.com/150' }}
              style={{
                width: 26,
                height: 17,
                alignItems: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.paymentLogo}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/(tabs)/home/brandProducts',
              })
            }}
          >
            <Image source={{ uri: 'https://via.placeholder.com/150' }}
              style={{
                width: 26,
                height: 17,
                alignItems: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.paymentLogo}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/(tabs)/home/brandProducts',
              })
            }}
          >
            <Image source={{ uri: 'https://via.placeholder.com/150' }}
              style={{
                width: 26,
                height: 17,
                alignItems: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Formik
        initialValues={{
          // get a uuid for the card id or save cards in db
          id: Math.floor(Math.random() * 1000000000).toString(),
          card_owner: 'George W',
          card_number: '5254 5454 5454 5454',
          exp: '12/22',
          cvv: '7763',
          user_id: user?.id!,
        }}
        onSubmit={async (values) => {
          // setLoading(true);
          try {
            // if (error) throw error
            console.log('values submitting CARD', values)
            submitCard({ ...values }, router, true);
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
  formContainer: {
    marginTop: 30,
    flexGrow: 1,
  },
  input: {
    padding: 10,
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
    marginBottom: 10,
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
    alignItems: 'center',
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
    paddingVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  paymentLogo: {
    backgroundColor: colors.grey5,
    borderRadius: 10,
    padding: 10,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});