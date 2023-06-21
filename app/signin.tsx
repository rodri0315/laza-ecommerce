import { Link, useRouter, useSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from './config/colors';
import SocialButton from './components/SocialButton';
import { Ionicons } from '@expo/vector-icons';
import BackButton from './components/BackButton';

export default function SignIn() {
  const navigation = useRouter();
  const params = useSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <BackButton />
        <Text style={styles.header}>Let's Get Started</Text>
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={
          {
            flex: 1,
            justifyContent: 'center',
          }
        }>
          <SocialButton text="Facebook" color={colors.facebook} />
          <SocialButton text="Twitter" color={colors.twitter} />
          <SocialButton text="Google" color={colors.google} />
        </View>
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
        <Text style={styles.text}>{'Already have an account? '}
          <Link href="/login" style={{ color: colors.dkGreyBg }}>Signin</Link>
        </Text>

        <TouchableOpacity
          onPress={() => navigation.push("/signup")}
          style={{
            minHeight: '10%',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            paddingTop: 20,
          }}>
          <Text style={styles.accountText}>Create an Account</Text>
        </TouchableOpacity>
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
    paddingTop: 15,
  },
  text: {
    fontSize: 15,
    paddingBottom: 20,
    alignSelf: 'center',
  },
  accountText: {
    color: 'white',
    fontSize: 17,
  }
});
