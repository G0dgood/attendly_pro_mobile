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
        onBlur={() => setIsFocused(isFocused)}
        autoCapitalize="none"
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
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    height: 50,
  },
  activeContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: colors.white,
    borderColor: colors.accent_blue_light,
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 4,
  },
  input: {
    fontFamily: 'Inter,',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    color: '#667085',
    flex: 1,
    height: 50,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
});

export default TextInputFieldPassword;
