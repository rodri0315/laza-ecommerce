import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { Input, Switch, Text } from '@rneui/themed';
import { supabaseClient } from '../config/supabase-client';
import { Link, useRouter } from 'expo-router';
import colors from '../config/colors';
import { Session } from '@supabase/supabase-js';
import BackButton from '../components/BackButton';
import * as Yup from "yup";
import { Ionicons } from '@expo/vector-icons';
import { passwordRules } from '../helpers/constants';
import { displayValidationIcon } from '../helpers/helpers';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const navigation = useRouter();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [loading, setLoading] = useState(false);
  const { SignIn } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <BackButton />
        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.subtitle}>Please enter your data to continue</Text>
      </View>
      <View style={{ flex: 5 }}>
        <Formik
          initialValues={{ password: '', email: '', username: '' }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const { error, data } = await supabaseClient.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                  data: {
                    username: values.username,
                  },
                },
              });
              if (error) console.log('Error: ', error);
              SignIn(data.session)
            } catch (err) {
              throw err;
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={
            Yup.object().shape({
              username: Yup.string().required("Username required").min(3).max(50),
              password: Yup.string().matches(
                passwordRules, { message: "Password must be at least 8 chars, contain at least one Uppercase and Number" })
                .required().min(8).max(50),
              email: Yup.string().required().email("Valid email required").max(50),
            })
          }
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <View style={{
                  flex: 5,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                  <View>
                    <Input
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      label="Username"
                      value={values.username}
                      placeholder="Username"
                      rightIcon={
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color={colors.secondary3}
                        />
                      }
                      rightIconContainerStyle={{
                        display: `${displayValidationIcon(
                          errors.username, touched.username, values.username
                        )}`
                      }}
                      errorMessage={`${errors.username ? errors.username : ""}`}
                      inputContainerStyle={styles.input}
                      labelStyle={styles.label}
                    />
                    <View style={{ position: 'relative' }}>

                      <Input
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        label="Password"
                        value={values.password}
                        placeholder="Password"
                        secureTextEntry
                        errorMessage={`${errors.password && touched.password ? errors.password : ""}`}
                        inputContainerStyle={styles.input}
                        labelStyle={styles.label}
                      />
                      <Text style={{
                        position: 'absolute',
                        right: 10,
                        top: 35,
                        color: colors.secondary3,
                        fontSize: 11,
                        display: `${displayValidationIcon(
                          errors.password, touched.password, values.password
                        )}`
                      }}>Strong</Text>
                    </View>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      label="Email Address"
                      value={values.email}
                      placeholder="Email"
                      rightIcon={
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color={colors.secondary3}
                          style={{
                            display: `${displayValidationIcon(
                              errors.email, touched.email, values.email
                            )}`
                          }}
                        />
                      }
                      errorMessage={`${errors.email && touched.email ? errors.email : ""}`}
                      inputContainerStyle={styles.input}
                      labelStyle={styles.label}
                    />
                  </View>
                  <View style={styles.toggle}>
                    <Text>Remember me</Text>
                    <Switch
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                      style={styles.switch}
                      trackColor={{ false: colors.grey3, true: colors.secondary3 }}
                    />
                  </View>

                </View>

                <View style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      minHeight: '12%',
                      marginHorizontal: -20,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      backgroundColor: colors.primary,
                      paddingTop: 20,
                    }}>
                    <Text style={styles.accountText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.grey3,
    alignSelf: 'center',
  },
  accountText: {
    color: 'white',
    fontSize: 17,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  forgotPassword: {
    color: colors.red,
  },
  input: {
    borderBottomColor: colors.grey6,
  },
  switch: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  label: {
    color: colors.grey3,
    fontSize: 13,
    fontWeight: 'normal',
  }
});

