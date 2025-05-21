import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the context type
interface UserContextType {
	userData: Record<string, any> | null;
	setUserData: (data: Record<string, any> | null) => void;
}

// Create the User Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the User Provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userData, setUserData] = useState<Record<string, any> | null>(null);

	// Load user data from AsyncStorage on initialization
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const storedUserData = await AsyncStorage.getItem('egf-user-info');
				if (storedUserData) {
					setUserData(JSON.parse(storedUserData));
				}
			} catch (error) {
				console.error('Failed to load user data from AsyncStorage:', error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
};

// Hook to use the User Context
export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
