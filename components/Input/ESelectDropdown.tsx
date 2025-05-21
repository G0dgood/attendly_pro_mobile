import React, { useState } from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../../css/colorsIndex';

interface Option {
	title: string;
}

interface ESelectDropdownProps {
	setOption: (option: string) => void;
	options: Option[];
	showTopLabel: boolean;
	label: string;
	title: string;
	value: string;
}

const ESelectDropdown: React.FC<ESelectDropdownProps> = ({
	setOption,
	value,
	options,
	showTopLabel,
	label,
	title,
}) => {
	const handleSelect = (selectedItem: Option) => {
		setOption(selectedItem?.title);
	};

	return (
		<View>
			{showTopLabel && <Text style={styles.label}>{label}</Text>}

			<Dropdown
				data={options}
				value={value}
				labelField="title"
				valueField="title"
				placeholder={title}
				onChange={handleSelect}
				style={styles.dropdownButtonStyle}
				placeholderStyle={styles.dropdownButtonTxtStyle}
				selectedTextStyle={styles.dropdownButtonTxtStyle}
				itemTextStyle={styles.dropdownItemTxtStyle}
				containerStyle={styles.dropdownMenuStyle}
				renderItem={(item) => (
					<View style={styles.dropdownItemStyle}>
						<Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default ESelectDropdown;

const styles = StyleSheet.create({
	label: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 20,
		color: colors.gray700,
		marginBottom: 6,
	} as TextStyle,

	dropdownButtonStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 14,
		gap: 8,
		backgroundColor: colors.white,
		borderColor: '#D0D5DD',
		borderWidth: 1,
		borderRadius: 8,
		shadowColor: '#101828',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	} as ViewStyle,

	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 12,
		fontWeight: '500',
		color: colors.gray900,
	} as TextStyle,

	dropdownMenuStyle: {
		backgroundColor: colors.white,
		borderRadius: 8,
		elevation: 5,
	} as ViewStyle,

	dropdownItemStyle: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 8,
	} as ViewStyle,

	dropdownItemTxtStyle: {
		fontSize: 12,
		fontWeight: '500',
		color: colors.gray900,
	} as TextStyle,
});
