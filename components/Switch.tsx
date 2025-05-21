import React, { useState } from 'react';
import { Switch, StyleSheet } from 'react-native';

const SwitchApp = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	return (
		<Switch
			trackColor={{ false: '#767577', true: '#1D76BB' }}
			thumbColor={isEnabled ? '#fff' : '#fff'}
			ios_backgroundColor="#D9D9D9"
			onValueChange={toggleSwitch}
			value={isEnabled}
			style={styles.switch}
		/>
	);
};

const styles = StyleSheet.create({
	switch: {
		transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Adjust scale as needed
	},
});

export default SwitchApp;

