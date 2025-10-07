import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authenticateUser, clearError } from "../../slices/authSlice";
import TextInputField from "../../components/TextInputField";
import PrimaryButton from "../../components/PrimaryButton";
import ErrorMessage from "../../components/ErrorMessage";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "@/css/colorsIndex";
import { BlueLogo } from "@/assets/svg/BlueLogo";
import { RootStackParamList } from "@/types";
import TextInputFieldPassword from "@/components/TextInputFieldPassword";
import { EyeOff } from "@/assets/svg/EyeOff";
import { EyeOn } from "@/assets/svg/EyeOn";
import Fingerprint from "@/assets/svg/Fingerprint";
import { UnlockIphone } from "@/assets/svg/UnlockIphone";
import { UnlockAndroid } from "@/assets/svg/UnlockAndroid";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isTouchIdEnabled, setIsTouchIdEnabled] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const { error, isLoading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const handleLogin = async () => {
    dispatch(authenticateUser({ username, password }));

    // Save credentials if Touch ID is enabled
    if (isTouchIdEnabled) {
      try {
        await AsyncStorage.setItem("savedUsername", username);
        await AsyncStorage.setItem("savedPassword", password);
      } catch (error) {
      }
    }
  };

  // Check biometric availability and Touch ID settings
  useEffect(() => {
    const checkBiometricAvailability = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        const supportedTypes =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        const touchIdEnabled = await AsyncStorage.getItem("touchIdEnabled");


        setIsBiometricAvailable(hasHardware && isEnrolled);
        setIsTouchIdEnabled(touchIdEnabled === "true");
      } catch (error) {
      }
    };

    checkBiometricAvailability();
  }, []);

  // Get biometric type for display
  const getBiometricType = () => {
    if (Platform.OS === "ios") {
      return "Face ID";
    } else {
      return "Fingerprint";
    }
  };

  // Handle biometric login (Face ID/Touch ID/Fingerprint)
  const handleBiometricLogin = async () => {
    try {
      const biometricType = getBiometricType();
      const promptMessage =
        Platform.OS === "ios"
          ? "Use Face ID to login"
          : "Use Fingerprint to login";
      const fallbackLabel =
        Platform.OS === "ios" ? "Use Passcode" : "Use Password";

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel,
        disableDeviceFallback: false, // Allow PIN/Passcode fallback
        cancelLabel: "Cancel",
      });

      if (result.success) {
        // Get saved credentials
        const savedUsername = await AsyncStorage.getItem("savedUsername");
        const savedPassword = await AsyncStorage.getItem("savedPassword");

        if (savedUsername && savedPassword) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          dispatch(
            authenticateUser({
              username: savedUsername,
              password: savedPassword,
            })
          );
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      } else {
        // Handle different failure reasons silently for login
        if (result.error === "user_cancel") {
          // Don't show error for user cancellation during login
        } else if (result.error === "authentication_failed") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  useEffect(() => {
    if (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Add success haptic when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [isAuthenticated]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 20 : 0}
      style={styles.container}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container_main}>
          <View style={styles.titleContainer}>
            <BlueLogo />
            <Text style={styles.title}>Log into your account</Text>
            <Text style={styles.subtitle}>Please enter your details</Text>
          </View>

          <View style={styles.inputFieldContainer}>
            {/* Test with basic TextInput */}
            <TextInput
              ref={passwordRef}
              style={[styles.testInput, usernameFocused && styles.focusedInput]}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              autoCapitalize="none"
            />
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[
                  styles.testInput,
                  passwordFocused && styles.focusedInput,
                ]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={true}
                selectTextOnFocus={true}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconAbsolute}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {showPassword ? <EyeOn /> : <EyeOff />}
              </TouchableOpacity>
            </View>
          </View>

          <ErrorMessage
            message="Incorrect Username or Password"
            visible={!!error}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgotPasswordContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <PrimaryButton
              title="Log in"
              onPress={handleLogin}
              disabled={!username || !password}
              isLoading={isLoading}
            />
          </View>

          {/* Biometric Login Button */}
          {isBiometricAvailable && isTouchIdEnabled && (
            <TouchableOpacity
              style={[
                styles.touchIdButton,
                Platform.OS === "ios" && styles.faceIdButton,
              ]}
              onPress={handleBiometricLogin}
              activeOpacity={0.7}
            >
              {Platform.OS === "ios" ? (
                <UnlockIphone color={colors.accent_blue} />
              ) : (
                <UnlockAndroid color={colors.accent_blue} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    gap: 12,
    marginBottom: 16,
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
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.01,
    color: colors.gray900,
  },
  subtitle: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray500,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    color: colors.accent_blue,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  testInput: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    height: 50,
    fontSize: 16,
    color: "#101828",
    marginBottom: 12,
  },
  focusedInput: {
    borderColor: colors.accent_blue_light || "#5B9BD5",
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    height: 50,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#101828",
    height: "100%",
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  eyeIconAbsolute: {
    position: "absolute",
    right: 14,
    top: 12,
    padding: 5,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchIdButton: {
    marginTop: 50,
    width: 100,
    height: 100,
    // backgroundColor: colors.gray200,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: colors.gray300,
    alignSelf: "center",
  },
  faceIdButton: {
    width: 70,
    height: 70,
    // backgroundColor: colors.accent_blue_light || "#E3F2FD",
    // borderColor: colors.accent_blue,
    // borderWidth: 2,
  },
});

export default LoginScreen;
