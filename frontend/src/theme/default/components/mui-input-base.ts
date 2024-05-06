import { Components } from '@mui/material/styles';
import { Theme as SystemTheme } from '@mui/system';

export const MuiInputBase: Components<SystemTheme>['MuiInputBase'] = {
  styleOverrides: {
    input: {
      // padding: '8.5px 8px',
    },
    multiline: {
      // padding: '8.5px 18px',
    },
  },
};
