import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '@/css/colorsIndex';

interface TextInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onSubmitEditing?: () => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  onSubmitEditing,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocusProp) onFocusProp(e); // Call the prop function if provided
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlurProp) onBlurProp(e); // Call the prop function if provided
  };

  return (
    <View style={[styles.container, isFocused && styles.activeContainer]}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#667085"
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 0,
    backgroundColor: colors.white || '#FFFFFF',
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
});

export default TextInputField;
