import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '@/css/colorsIndex';

interface TextInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
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
        // onBlur={handleBlur}  
        autoCapitalize="none"
        keyboardType="default"
        allowFontScaling={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    backgroundColor: colors.white || '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
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
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    color: '#667085',
    flex: 1,
    height: '100%',
  },
});

export default TextInputField;
