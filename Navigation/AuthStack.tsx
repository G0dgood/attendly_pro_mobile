import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@/screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SuccessScreen from '../screens/Auth/SuccessScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import { RootStackParamList } from '@/types';


const Stack = createStackNavigator<RootStackParamList>();

const AuthStack: React.FC = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Success" component={SuccessScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="ForgetPasswordData" component={ForgotPassword} />
  </Stack.Navigator>
);

export default AuthStack;
