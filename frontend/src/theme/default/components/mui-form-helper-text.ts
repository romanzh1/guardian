import { Components } from '@mui/material/styles';
import { Theme as SystemTheme } from '@mui/system';

export const MuiFormHelperText: Components<SystemTheme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: {
      marginLeft: '8px',
      marginRight: '8px',
    },
  },
};
