// DateContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DateContextType {
	currentDate: Date;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			const newDate = new Date();
			setCurrentDate(newDate); // Update the current date every second
			AsyncStorage.setItem('currentDate', newDate.toISOString()); // Store the current date in AsyncStorage
		}, 1000);

		return () => clearInterval(interval); // Cleanup on component unmount
	}, []);

	return (
		<DateContext.Provider value={{ currentDate }}>
			{children}
		</DateContext.Provider>
	);
};

export const useCurrentDate = (): DateContextType => {
	const context = React.useContext(DateContext);
	if (!context) {
		throw new Error('useCurrentDate must be used within a DateProvider');
	}
	return context;
};
