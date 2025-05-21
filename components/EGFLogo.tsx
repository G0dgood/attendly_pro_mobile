import React from 'react';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';


export default function EGFLogo() {
  return (
    <Image style={styles.image}source={require('../assets/images/egf-logo.png')} />
  )
}


const styles = StyleSheet.create({
    image: {
      width: 48,
      height: 51,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginBottom: 16,
    },
})