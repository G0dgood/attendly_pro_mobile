import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '@/css/colorsIndex';
import { EyeOff } from '@/assets/svg/EyeOff';
import { EyeOn } from '@/assets/svg/EyeOn';

interface TextInputFieldPasswordProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

const TextInputFieldPassword: React.FC<TextInputFieldPasswordProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  onTogglePassword,
}) => {
  const [isFocused, setIsFocused] = useState(false);



  return (
    <View style={[styles.container, isFocused && styles.activeContainer]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#667085"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        returnKeyType="done"
      />
      {showPasswordToggle && (
        <TouchableOpacity onPress={onTogglePassword} style={styles.iconContainer}>

          <Text>
            {secureTextEntry ? <EyeOff /> : <EyeOn />}
          </Text>

        </TouchableOpacity>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    height: 50,
  },
  activeContainer: {
    borderColor: colors.accent_blue_light || '#5B9BD5',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 4, // For Android
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#101828',
    flex: 1,
    height: '100%',
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
});

export default TextInputFieldPassword;
