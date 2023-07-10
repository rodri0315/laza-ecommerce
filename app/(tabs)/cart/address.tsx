// react native screen with title 

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input, Switch } from '@rneui/themed';
import { useProducts } from '../../contexts/ProductContext';
import BackButton from '../../components/BackButton';
import { Formik } from 'formik';
import colors from '../../config/colors';
import { useCart } from '../../contexts/cart/CartContext';
import { useRouter } from 'expo-router';

export default function Address() {
  const router = useRouter();
  const [isPrimary, setIsPrimary] = useState(false);
  const { products } = useProducts();
  const { user, session, signOut } = useAuth();
  const { cart, submitAddress } = useCart();
  const toggleSwitch = () => setIsPrimary(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Address</Text>
        </View>
        <View style={styles.backButton}>
          <BackButton />
        </View>
      </View>
      <Formik
        initialValues={{
          full_name: 'George W',
          country: 'USA',
          city: 'Raleigh',
          phone: '5555644545',
          address: '1 Infinite Loop',
          is_primary: isPrimary,
          user_id: user?.id!,
        }}
        onSubmit={async (values) => {
          // setLoading(true);
          try {
            // if (error) throw error
            submitAddress({ ...values, is_primary: isPrimary }, router);
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
                    onChangeText={handleChange('full_name')}
                    onBlur={handleBlur('full_name')}
                    label="Name"
                    value={values.full_name}
                    placeholder="Type your name"
                    inputContainerStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                  />
                  {/* row of two inpues */}
                  <View style={styles.row}>
                    <View style={styles.rowInput}>
                      <Input
                        onChangeText={handleChange('country')}
                        onBlur={handleBlur('country')}
                        label="Country"
                        value={values.country}
                        placeholder="Country"
                        inputContainerStyle={styles.input}
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                      />
                    </View>
                    <View style={styles.rowInput}>
                      <Input
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        label="City"
                        value={values.city}
                        placeholder="City"
                        textAlignVertical='top'
                        inputContainerStyle={styles.input}
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                      />
                    </View>
                  </View>
                  <Input
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    label="Phone Number"
                    value={values.phone}
                    placeholder="Phone Number"
                    textAlignVertical='top'
                    inputContainerStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    keyboardType='numeric'
                  />
                  <Input
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    label="Address"
                    value={values.address}
                    placeholder="Address"
                    textAlignVertical='top'
                    inputContainerStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                  />
                </View>
                <View style={styles.toggle}>
                  <Text style={styles.toggleText}>Save as primary address</Text>
                  <Switch
                    onValueChange={toggleSwitch}
                    value={isPrimary}
                    style={styles.switch}
                    trackColor={{ false: colors.grey3, true: colors.secondary3 }}
                  />
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
    marginTop: 20,
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
  switch: {
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
});