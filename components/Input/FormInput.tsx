import { useState } from 'react';
import { TextInput as BaseInput, ColorValue, StyleSheet, TextInputProps as BaseTextInputProps, View, Text } from 'react-native';
import React from 'react';
import { colors } from '@/css/colorsIndex';

interface TextInputProps extends BaseTextInputProps {
  children?: any,
  prepend?: any,
  postpend?: any,
  label?: string
  showTopLabel?: boolean
  value?: string
  mode?: string
  childholdmain?: any
  error?: string,
  numberOfLines?: number,
  touched?: boolean
  props?: any
  outlineColor?: ColorValue
  textColor?: ColorValue
  onChangeText?: (e: any) => void
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
}

const FormInput = ({
  multiline,
  numberOfLines,
  textAlignVertical,
  children,
  prepend,
  postpend,
  label,
  placeholder,
  showTopLabel = true,
  value,
  outlineColor = '#ccc',
  textColor = '#000',
  error = '',
  touched = false,
  props,
  childholdmain,
  onChangeText,
  onFocus,
  onBlur,
  ...restProps
}: TextInputProps) => {

  const [isFocused, setFocused] = useState(false);

  const handleFocus = (e: any) => {
    setFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  const handleChangeText = (e: any) => {
    onChangeText && onChangeText(e);
  };

  const handleChange = () => { };

  const inputStyle = {
    borderColor: (error && touched) ? 'red' : outlineColor,
    color: textColor,
  };

  return (
    <View style={childholdmain}>
      {showTopLabel ? <Text style={TextInputStyles.label}>{label}</Text> : ''}
      {children ??
        <View style={[TextInputStyles.childhold]}>
          {prepend && prepend}
          <BaseInput
            style={[
              TextInputStyles.input,
              inputStyle,
              props?.style]
            }
            placeholder={placeholder}
            placeholderTextColor="gray"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            onChange={handleChange}
            value={value}
            multiline={multiline}  // Enable multiline
            numberOfLines={numberOfLines}  // Set default number of visible lines
            textAlignVertical={textAlignVertical} // Align text to the top like a textarea
            {...restProps}
          />
          {postpend && postpend}
        </View>
      }
      {(error && touched) && <Text>{error}</Text>}
    </View>
  );
};

export const TextInputStyles = StyleSheet.create({
  'container': {
    width: "100%"
  },
  'label': {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray800,
  },

  'childhold': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#DDD',
    paddingHorizontal: 15,
    gap: 6,
    backgroundColor: colors.white,
    width: "100%"
  },

  'input': {
    paddingVertical: 10,
    fontFamily: 'Inter',
    flex: 1,
    fontSize: 12,
    height: 48,  // Adjust height to mimic a textarea
  },
});

export default FormInput;
