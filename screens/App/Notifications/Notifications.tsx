import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useRefresh } from '@/Context/RefreshContext';
import { colors } from '@/css/colorsIndex';
import NotificationsCard from './NotificationsCard';
import { RootStackParamList } from '@/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '@/components/Header';



// Define type for the Notifications component props
type NotificationsProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Notifications'>;
};

const Notifications: React.FC<NotificationsProps> = ({ navigation }) => {
	const { refreshing, onRefresh } = useRefresh();


	return (
		<View style={styles.headerContainer}>
			<Header text={'Notifications'} />
			<View style={styles.container}>
				<ScrollView
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={styles.scrollViewContent} 	>

					{/* NotificationsCard */}
					<NotificationsCard navigation={navigation} />
				</ScrollView>
			</View>
		</View>
	)
}

export default Notifications

const styles = StyleSheet.create({

	headerContainer: {
		flex: 1,
	},
	scrollViewContent: {
		paddingBottom: 100,
	},
	container: {
		flexGrow: 1,
		paddingTop: 10,
		backgroundColor: colors.background,
	}
})