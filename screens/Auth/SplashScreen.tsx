import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/css/colorsIndex';
import { Logo } from '@/assets/svg/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';



const SplashScreen: React.FC = ({ navigation }: any) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation?.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
