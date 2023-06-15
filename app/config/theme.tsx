import { ThemeProvider, createTheme } from '@rneui/themed';
import colors from './colors';

const theme = createTheme({
  lightColors: {
    ...colors,
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});

export default theme;