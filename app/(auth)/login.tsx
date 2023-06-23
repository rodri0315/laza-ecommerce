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

export default function Login(props) {
  const navigation = useRouter();
  //auth context for login
  console.log('props', props)

  const { SignIn } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [session, setSession] = useState<Session | null>()
  const [loading, setLoading] = useState(false);

  // const { handleSubmit } = useFormikContext();

  // const formik = useFormik({
  //   initialValues: {
  //     username: '',
  //     password: '',
  //     confirmPassword: '',
  //   },
  //   onSubmit: async (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //     // setLoading(true);
  //     // try {
  //     //   const { error } = await supabaseClient.auth.signInWithPassword({
  //     //     email,
  //     //     password
  //     //   })
  //     //   if (error) throw error
  //     //   navigation.replace("/");
  //     // } catch (err) {
  //     //   throw err;
  //     // } finally {
  //     //   setLoading(false);
  //     // }
  //   },
  // });

  // const Login = async () => {
  //   setLoading(true);
  //   try {
  //     const { error } = await supabaseClient.auth.signInWithPassword({
  //       email,
  //       password
  //     })
  //     if (error) throw error
  //     navigation.replace("/");
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
          <Text style={{}}>Please enter your data to continue</Text>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <Formik
          initialValues={{ password: 'password', confirmPassword: '', username: 'jorge@headway.io' }}
          onSubmit={async (values) => {
            alert(JSON.stringify(values, null, 2));
            setLoading(true);
            try {
              const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: values.username,
                password: values.password
              })
              if (error) throw error
              if (isEnabled) {
                AsyncStorage.setItem("user", JSON.stringify(data.session));
              }
              handleSignIn(data.session)
              // navigation.replace("/");
            } catch (err) {
              throw err;
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{
              flex: 1,
            }}>
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
                      label="Email"
                      value={values.username}
                      placeholder="Email"
                    />
                    <Input
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      label="Password"
                      value={values.password}
                      placeholder="Password"
                      secureTextEntry
                    />
                    <Input
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      label="Confirm Password"
                      value={values.confirmPassword}
                      placeholder="Password"
                      secureTextEntry
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.push("/forgot-password")}
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
                        <Link href="/login" style={{ color: colors.dkGreyBg }}>Term and Condition</Link>
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
    color: colors.dkGreyBg,
    textAlign: 'center',
  },
});

