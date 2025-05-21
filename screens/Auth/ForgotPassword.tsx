import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { colors } from '@/css/colorsIndex';


type SuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Success'>;

interface Props {
  navigation: SuccessScreenNavigationProp;
}

const ForgetPassword: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
          <Text style={styles.doneButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.successSection}>
        <Text style={styles.successText}>Reset Password</Text>
        <Text style={styles.message}>
          If you’ve forgotten your password, please contact the administrator to assist you with resetting it.
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
  },
  buttonContainer: {
    width: '100%',
    height: 50
  },
  doneButton: {
    top: 5,
    right: 25,
  },
  doneButtonText: {
    fontSize: 24,
    color: colors.accent_blue,
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  successSection: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    paddingVertical: 80,
  },
  successText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    color: '#A9A9A9',
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
    marginTop: 20
  },
  icon: {
    width: 72,
    height: 72,
  },
});

export default ForgetPassword;
