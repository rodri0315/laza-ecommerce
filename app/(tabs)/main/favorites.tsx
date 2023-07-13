// react native screen with title 

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@rneui/themed';
import { useProducts } from '../../contexts/ProductContext';

export default function Cart() {

  const { products } = useProducts();

  const { user, session, signOut } = useAuth();


  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <View
          style={{}}
        >
          <Text style={styles.header}>Favorites</Text>
        </View>
      </View>
      <View>
        {/* list of products */}
        {
          products.map((product, index) => {
            return (
              <Text key={index}>{product.name}</Text>
            )
          }
          )
        }
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