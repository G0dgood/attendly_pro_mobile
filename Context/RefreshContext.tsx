import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';

interface RefreshContextType {
	refreshing: boolean;
	onRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [refreshing, setRefreshing] = useState<any>(false);

	const onRefresh = useCallback(() => {
		const wait = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	return (
		<RefreshContext.Provider value={{ refreshing, onRefresh }}>
			{children}
		</RefreshContext.Provider>
	);
};

// Custom hook for easier access
export const useRefresh = () => {
	const context = useContext(RefreshContext);
	if (!context) {
		throw new Error('useRefresh must be used within a RefreshProvider');
	}
	return context;
};