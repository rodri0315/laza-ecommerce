import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Formik, useFormik, useFormikContext } from 'formik';
import { Input, Switch, Text } from '@rneui/themed';
import { supabaseClient } from '../config/supabase-client';
import { useRouter, Link } from 'expo-router';
import colors from '../config/colors';
import { Session, User } from '@supabase/supabase-js';
import BackButton from '../components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigation = useRouter();

  const { SignIn } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (user: Session) => {
    SignIn(user);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <BackButton />
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.subtitle}>Please enter your data to continue</Text>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <Formik
          initialValues={{ password: 'password', confirmPassword: '', email: 'jorge@headway.io' }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: values.email,
                password: values.password
              })
              if (error) throw error
              if (isEnabled) {
                AsyncStorage.setItem("user", JSON.stringify(data.session));
              }
              handleSignIn(data.session)
            } catch (err) {
              throw err;
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <View style={styles.body}>
                  <View>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      label="Email"
                      value={values.email}
                      placeholder="Email"
                      inputContainerStyle={styles.input}
                      labelStyle={styles.label}
                    />
                    <Input
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      label="Password"
                      value={values.password}
                      placeholder="Password"
                      secureTextEntry
                      inputContainerStyle={styles.input}
                      labelStyle={styles.label}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.push("/resetPassword")}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        padding: 10,
                        paddingBottom: 40,
                        paddingTop: 20,
                      }}>
                      <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
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

                  <View style={{
                    padding: 20,
                  }}>
                    <View>

                      <Text style={styles.termsText}>
                        {'By connecting your account confirm that you agree with our '}
                        <Link href="/login" style={{ color: colors.black }}>Term and Condition</Link>
                      </Text>
                    </View>
                  </View>
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
                    <Text style={styles.accountText}>Login</Text>
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
  },
  body: {
    flex: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    fontSize: 15,
  },
  termsText: {
    fontSize: 13,
    color: colors.grey3,
    textAlign: 'center',
  },
  switch: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  input: {
    borderBottomColor: colors.grey6,
  },
  label: {
    color: colors.grey3,
    fontSize: 13,
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: 15,
    color: colors.grey3,
  },
});

