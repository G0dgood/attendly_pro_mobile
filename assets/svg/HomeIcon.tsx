import React from 'react';
import { SvgXml } from 'react-native-svg';

const icon = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.44 7.32643L16.1543 0.696429C14.8543 -0.232143 13.1271 -0.232143 11.8457 0.696429L2.56 7.32643C1.57571 8.03214 1 9.14643 1 10.3536V25.155C1 26.1764 1.83571 27.0121 2.85714 27.0121H10.2857V15.8693H17.7143V27.0121H25.1429C26.1643 27.0121 27 26.1764 27 25.155V10.3536C27 9.14643 26.4243 8.03214 25.44 7.32643Z" fill="{color}"/>
</svg>
`;
export const HomeIcon = ({ color, size }: { color: string; size: number }) => (
	<SvgXml
		xml={icon.replace('{color}', color)}
		width={size}
		height={size}
	/>
);