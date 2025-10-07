import { colors } from '@/css/colorsIndex';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
  visible: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFCDD2',
    padding: 10,
    borderRadius: 0,
    marginBottom: 15,
    height: 40,
  },
  message: {
    color: colors.red,
    fontSize: 14,
  },
});

export default ErrorMessage;
