import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { Input, Switch, Text } from '@rneui/themed';
import { supabaseClient } from './config/supabase-client';
import { Link, useRouter } from 'expo-router';
import colors from './config/colors';
import { Session } from '@supabase/supabase-js';

export default function Signup() {
  const navigation = useRouter();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [session, setSession] = useState<Session | null>()
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.back()}
          style={{
            backgroundColor: 'lightgrey',
            padding: 20,
            borderRadius: 100,
            width: 30,
            height: 30,

          }}>
          {/* // back arrow */}
          <Text style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
          }}>
            {'<-'}
          </Text>
        </TouchableOpacity>

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
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{ password: '', email: '', username: '' }}
          onSubmit={async (values) => {
            alert(JSON.stringify(values, null, 2));
            setLoading(true);
            try {
              const { error } = await supabaseClient.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                  data: {
                    username: values.username,
                  },
                },
              });
              if (error) console.log('Error: ', error);
              navigation.replace("/");
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
              <View style={{
                flex: 1,
              }}>
                <View style={{
                  flex: 5,
                  justifyContent: 'center',
                }}>
                  <View>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      label="Email"
                      value={values.email}
                      placeholder="Email"
                    />
                    <Input
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      label="Username"
                      value={values.username}
                      placeholder="Username"
                    />
                    <Input
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      label="Password"
                      value={values.password}
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
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      minHeight: '10%',
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
    height: '15%',
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
  }
});

