import React from 'react';
import { View, StyleSheet } from 'react-native';
import { windowHeight } from '../../utils/Dimentions';
import { TextInput } from 'react-native-paper';

const FormInputTextarea = ({ label, keyboardType, formData, formErrors, value, onChangeText, error, ...rest }: any) => {

	return (
		<View>
			<TextInput
				mode="outlined"
				label={label}
				style={[styles.text_input, error ? styles.errorBorder : null]}
				value={value}
				onChangeText={onChangeText}
				multiline={true}
				numberOfLines={4}
				theme={{
					colors: { onSurfaceVariant: '#797a7d' },
					roundness: 14
				}}
				{...rest}
				activeOutlineColor="#43CE2E"
				keyboardType={keyboardType}
				autoCapitalize="none"
				autoCorrect={false}
			/>
		</View>
	);
};

export default FormInputTextarea;

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		marginBottom: 5,
	},
	errorBorder: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 5,
	},
	inputContainer: {
		width: '100%',
		height: windowHeight / 10,
		borderRadius: 16,
	},
	text_input: {
		backgroundColor: "#F0F4F8",
		fontFamily: "Inter",
		fontSize: 14,
		height: 100,
	},

});
