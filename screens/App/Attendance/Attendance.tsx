import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import TabToggle from '@/components/Input/TabToggle';
import { Snackbar } from 'react-native-paper';

// Define the props for the TabToggle component
interface TabToggleProps {
	setSnackbarVisible: Dispatch<SetStateAction<boolean>>;
	snackbarVisible: boolean;
	setMessages: Dispatch<SetStateAction<string>>;
}

const Attendance: React.FC = () => {
	const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
	const [messages, setMessages] = React.useState<string>(''); // Set type as string

	return (
		<View style={styles.container}>
			{/* Pass down typed props */}
			<TabToggle
				setSnackbarVisible={setSnackbarVisible}
				snackbarVisible={snackbarVisible}
				setMessages={setMessages} data={null} isLoading={false} isError={false} message={null} summarydata={undefined} summaryisLoading={false} summaryisError={false} summarymessage={null} calenderdata={undefined} calenderisLoading={false} calenderisError={false} calendermessage={null} />
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={3000} // Snackbar auto-dismiss time
			>
				{messages}
			</Snackbar>
		</View>
	);
};

export default Attendance;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
