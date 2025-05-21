import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { authenticateUser, clearError } from '../../slices/authSlice';
import TextInputField from '../../components/TextInputField';
import PrimaryButton from '../../components/PrimaryButton';
import ErrorMessage from '../../components/ErrorMessage';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/css/colorsIndex';
import { BlueLogo } from '@/assets/svg/BlueLogo';
import { RootStackParamList } from '@/types';
import TextInputFieldPassword from '@/components/TextInputFieldPassword';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props { navigation: LoginScreenNavigationProp }

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);
  const handleLogin = () => { dispatch(authenticateUser({ username, password })) };


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);



  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container_main}>
          <View style={styles.titleContainer}>
            <BlueLogo />
            <Text style={styles.title}>Log into your account</Text>
            <Text style={styles.subtitle}>Please enter your details</Text>
          </View>

          <View style={styles.inputFieldContainer}>
            <TextInputField
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInputFieldPassword
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
          </View>

          <ErrorMessage message="Incorrect Username or Password" visible={!!error} />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <PrimaryButton title="Log in" onPress={handleLogin} disabled={!username || !password} isLoading={isLoading} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};


const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
  },
  button: {
    marginTop: 32,
  },

  inputFieldContainer: {
    gap: 24,
    marginBottom: 16
  },
  titleContainer: {
    marginTop: 24,
    marginBottom: 32,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  container_main: {
    margin: 20,
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  title: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.01,
    color: colors.gray900,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray500,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: colors.accent_blue,
  },
});

export default LoginScreen;