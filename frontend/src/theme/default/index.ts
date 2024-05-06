import { experimental_extendTheme as extendTheme } from '@mui/material';
import { components } from './components';
import { palette } from './palette';
import { properties } from './properties';
import { typography } from './typography';
import { breakpoints } from './breakpoints';

export const defaultTheme = extendTheme({
  colorSchemes: palette,
  typography,
  components,
  properties,
  breakpoints,
});
