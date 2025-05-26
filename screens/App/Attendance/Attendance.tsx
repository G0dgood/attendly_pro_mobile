import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import TabToggle from '@/components/Input/TabToggle';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getLoggedInUserAttendance } from '@/features/Attendance/attendanceSlice';
import { loginUser } from '@/features/clockInandOut/clockInSlice';
import { RootState } from '@/utils/store';

// Define the props for the TabToggle component
interface TabToggleProps {
	setSnackbarVisible: Dispatch<SetStateAction<boolean>>;
	snackbarVisible: boolean;
	setMessages: Dispatch<SetStateAction<string>>;
}

const Attendance: React.FC = () => {
	const [messages, setMessages] = React.useState<string>(''); // Set type as string
	const dispatch = useAppDispatch();
	const { logindata } = useAppSelector((state: any) => state.clock);
	const { data, isLoading, message, isError } = useAppSelector((state: RootState) => state.attendance);


	return (
		<View style={styles.container}>
			{/* Pass down typed props */}
			<TabToggle
				setSnackbarVisible={setSnackbarVisible}
				snackbarVisible={snackbarVisible}
				setMessages={setMessages} data={null} isLoading={false} isError={false} message={null} summarydata={undefined} summaryisLoading={false} summaryisError={false} summarymessage={null} calenderdata={undefined} calenderisLoading={false} calenderisError={false} calendermessage={null} />

		</View>
	);
};

export default Attendance;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
