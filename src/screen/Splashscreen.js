import React from "react";

import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../constants/theme';

const Splashscreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace('Home')
  }, 3000);

  return (
    <View style={styles.body}>
      <Image
        source={IMAGES.eSwarna_Logo}
        style={{ width: 249, height: 55 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }

});

export default Splashscreen;