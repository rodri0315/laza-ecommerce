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
      <View style={styles.topHeader}>
        <View
          style={{}}
        >
          <Text style={styles.header}>Hello</Text>
          <Text style={{}}>Welcome to Laza</Text>
          <Text>{user?.email}</Text>
        </View>
      </View>
      <Button title="Sign Out" onPress={signOut} />
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
});