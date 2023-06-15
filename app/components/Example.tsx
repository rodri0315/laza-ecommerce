import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default function Example() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to start working on your app! JR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'space-mono',
  },
  link: {
    color: 'blue',
  }
});
