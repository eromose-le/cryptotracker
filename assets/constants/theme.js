export const COLORS = {
  primary: '#001F2D',
  secondary: '#4D626C',

  white: '#FFF',
  gray: '#74858C'
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24
};

export const FONTS = {
  bold: 'InterBold',
  semiBold: 'InterSemiBold',
  medium: 'InterMedium',
  regular: 'InterRegular',
  light: 'InterLight'
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14
  }
};

export const colorThemes = [
  {
    name: 'dark',
    mood: 'light',
    primary: '#fff',
    secondary: '#585858',
    tertiary: 'grey',
    lineColor: '#282828',
    tableColor: '#2B2B2B',
    background: '#000',
    tabBackground: '#181818',
    tabTopBorderColor: 'transparent',
    inputBackground: '#1e1e1e',
    body: '#121212',
    gradientOpacity: 0.5,
    switchColor: '#aaa',
    bool: false
  },
  {
    name: 'light',
    mood: 'dark',
    primary: '#000',
    secondary: '#b9b9b9',
    tertiary: 'grey',
    lineColor: '#ddddddd3',
    tableColor: 'lightgrey',
    background: '#fff',
    tabBackground: '#f5f5f5',
    tabTopBorderColor: '#ddd',
    inputBackground: '#eeeeee',
    body: '#f1f0f0',
    gradientOpacity: 0,
    switchColor: '#eee',
    bool: true
  }
];
