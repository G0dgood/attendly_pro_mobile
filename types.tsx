/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}



export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AppStack: NavigatorScreenParams<RootTabParamList> | undefined;
  AuthStack: NavigatorScreenParams<RootTabParamList> | undefined;
  Checkout: undefined;
  Home: undefined;
  ClockIn: undefined;
  navigation: undefined;
  Notifications: undefined;
  Profile: undefined;
  Splash: undefined;
  Login: undefined;
  ChangePassword: undefined;
  Success: undefined;
  NotificationsSettings: undefined;
  SuccessProfile: undefined;
  ForgotPassword: undefined;
  AttachmentModal: undefined;
  ForgotPasswordSuccess: undefined;
  BarCodeCamera: undefined;
  Successs: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {

  Home: undefined;
  Attendance: undefined;
  Profile: undefined;
};



