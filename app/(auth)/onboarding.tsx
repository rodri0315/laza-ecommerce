import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../config/colors';
import { useTheme } from '@rneui/themed';
import Button from '../components/Button';
import { useRouter } from 'expo-router';

const Onboarding = () => {
  const [selected, setSelected] = useState<boolean | null>(false);
  const [womenSelected, setWomenSelected] = useState<boolean | null>(false);
  const navigation = useRouter();

  const onPress = () => {
    setSelected(true);
    setWomenSelected(false);
    navigation.push({
      pathname: "/signin",
      params: { selection: 'men' }
    })
  };
  const onWomenPress = () => {
    setSelected(false);
    setWomenSelected(true);
    navigation.push({
      pathname: "/signin",
      params: { selection: 'women' }
    })
  };

  return (
    <SafeAreaView
      style={styles.background}
    >
      <ImageBackground source={
        require('../../assets/man.png')
      } resizeMode="cover" style={styles.imageBackground}>
        <View
          style={styles.container}
        >
          <Text style={[styles.header, styles.textPadding]}>
            Look Good, Feel Good
          </Text>
          <Text style={[styles.text, styles.textPadding]}>
            Create your individual & unique style and look amazing everyday.
          </Text>
          <View style={styles.buttonsRow}>
            <Button text='Men' selected={selected} onPress={onPress} />
            <Button text='Women' selected={womenSelected} onPress={onWomenPress} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.push("/signin")}
            style={styles.skipContainer}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    margin: 15,
  },
  textPadding: {
    padding: 10,
  },
  header: {
    fontSize: 28,
  },
  text: {
    fontSize: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  skipText: {
    fontSize: 17,
    color: colors.grey3,
  },
});

export default Onboarding;