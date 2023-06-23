// react native screen with title 

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@rneui/themed';

export default function Home() {

  const { user, session, signOut } = useAuth();

  console.log('HOME: ' + user)
  console.log('HOME: Session ' + JSON.stringify(session))
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});