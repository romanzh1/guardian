import { ThemeOptions } from '@mui/material/styles';

const fontFamily = ['IBM Plex Sans', 'arial', 'sans-serif'].join(',');

export const typography: ThemeOptions['typography'] = {
  fontFamily,
  h1: {
    fontSize: '2rem',
  },
  h2: {
    fontSize: '1.5rem',
  },
  h3: {
    fontSize: '1.25rem',
  },
  h4: {
    fontSize: '1rem',
  },
  subtitle: {
    fontSize: '0.875rem',
    fontFamily,
  },
  text: {
    fontSize: '0.8125rem',
    fontFamily,
  },
  subtext: {
    fontSize: '0.75rem',
    fontFamily,
  },
  tinytext: {
    fontSize: '0.625rem',
    fontFamily,
  },
};
