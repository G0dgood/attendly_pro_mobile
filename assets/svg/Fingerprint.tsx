import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

interface FingerprintProps {
	size?: number;
	color?: string;
}

const Fingerprint: React.FC<FingerprintProps> = ({ size = 24, color = '#666666' }) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			{/* Fingerprint ridges */}
			<Path
				d="M8 4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6C16 7.1 15.1 8 14 8H10C8.9 8 8 7.1 8 6V4Z"
				fill={color}
			/>
			<Path
				d="M6 8C6 6.9 6.9 6 8 6H16C17.1 6 18 6.9 18 8V10C18 11.1 17.1 12 16 12H8C6.9 12 6 11.1 6 10V8Z"
				fill={color}
			/>
			<Path
				d="M4 12C4 10.9 4.9 10 6 10H18C19.1 10 20 10.9 20 12V14C20 15.1 19.1 16 18 16H6C4.9 16 4 15.1 4 14V12Z"
				fill={color}
			/>
			<Path
				d="M6 16C6 14.9 6.9 14 8 14H16C17.1 14 18 14.9 18 16V18C18 19.1 17.1 20 16 20H8C6.9 20 6 19.1 6 18V16Z"
				fill={color}
			/>
			<Path
				d="M8 20C8 18.9 8.9 18 10 18H14C15.1 18 16 18.9 16 20V22C16 23.1 15.1 24 14 24H10C8.9 24 8 23.1 8 22V20Z"
				fill={color}
			/>

			{/* Fingerprint center */}
			<Circle cx="12" cy="12" r="3" fill={color} opacity="0.3" />

			{/* Fingerprint swirls */}
			<Path
				d="M12 9C13.1 9 14 9.9 14 11C14 12.1 13.1 13 12 13C10.9 13 10 12.1 10 11C10 9.9 10.9 9 12 9Z"
				fill={color}
				opacity="0.5"
			/>
		</Svg>
	);
};

export default Fingerprint;
