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
  header1: {
    fontSize: 28,
  },
  header2: {
    fontSize: 25,
  },
});

export default theme;