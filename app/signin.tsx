import { Link, useRouter, useSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from './config/colors';
import SocialButton from './components/SocialButton';

export default function SignIn() {
  const navigation = useRouter();
  const params = useSearchParams();

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

      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.header}>Let's Get Started</Text>
        <View style={
          {
            paddingVertical: 10,
          }
        }>
          <SocialButton text="Facebook" color={colors.facebook} />
          <SocialButton text="Twitter" color={colors.twitter} />
          <SocialButton text="Google" color={colors.google} />
        </View>
        <Text style={styles.text}>{'Already have an account? ' }
          <Link href="/login" style={{color: colors.dkGreyBg}}>Signin</Link>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.push("/signup")}
        style={{
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingTop: 20,
      }}>
        <Text style={styles.accountText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
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
  text: {
    fontSize: 15,
    paddingBottom: 20,
  },
  accountText: {
    color: 'white',
    fontSize: 17,
  }
});
