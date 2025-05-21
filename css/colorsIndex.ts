export interface Colors {
  accent_blue: string;
  accent_blue_light: string;
  accent_Primary: string;
  secondary: string;
  white: string;
  icon_background: string;
  background: string;
  Overlaybackground: string;
  smail_text_color: string;
  black: string;
  purple: string;
  red: string;
  green: string;
  orange: string;
  yellow: string;
  border_color: string;
  gray25: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
}

export const colors: Colors = {
  accent_blue: '#003399',
  accent_blue_light: '#BBDFFB',
  accent_Primary: '#1D76BB',
  secondary: '#FF5733',
  purple: '#6035DC',
  white: '#FFFFFF',
  icon_background: '#EBEBEB',
  background: '#EFF1F5',
  Overlaybackground: 'rgba(0, 0, 0, 0.5)',
  smail_text_color: '#D0D5DD',
  black: '#14181B',
  red: '#F04438',
  green: '#09B361',
  yellow: '#D4A108',
  orange: 'orange',
  border_color: '#B0B0B0',
  gray25: '#FCFCFD',
  gray200: '#EAECF0',
  gray300: '#D0D5DD',
  gray400: '#98A2B3',
  gray500: '#667085',
  gray600: '#475467',
  gray700: '#344054',
  gray800: '#1D2939',
  gray900: '#101828',
};

export interface ButtonStyle {
  justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly';
  alignItems: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  paddingVertical: number;
  paddingHorizontal: number;
  gap: number;
  marginHorizontal: string;
  width: string | number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export const button: { blue_button: ButtonStyle | any } = {
  blue_button: { 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    gap: 8,
    marginHorizontal: 'auto',
    width: '100%',
    height: 44,
    backgroundColor: colors.accent_blue,
    borderColor: colors.accent_blue,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: colors.gray900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // For Android shadow
  },
};
