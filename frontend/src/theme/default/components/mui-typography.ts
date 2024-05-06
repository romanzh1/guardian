import { Components } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const MuiTypography: Components<Theme>['MuiTypography'] = {
  defaultProps: {
    color: 'textPrimary',
  },
  styleOverrides: {
    root: {
      wordBreak: 'break-word',
    },
  },
};
