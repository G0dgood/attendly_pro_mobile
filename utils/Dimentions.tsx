import { Dimensions, PixelRatio } from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const deviceFont = 12 * PixelRatio.getFontScale();
export const defaultFontSize = Math.max(Math.min(deviceFont, 13), 10);