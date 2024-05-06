import { Components } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const MuiSvgIcon: Components<Theme>['MuiSvgIcon'] = {
  defaultProps: {},
  styleOverrides: {
    root: {},
  },
  variants: [
    {
      props: { fontSize: 'huge' },
      style: { fontSize: '48px' },
    },
    {
      props: { fontSize: 'tiny' },
      style: { fontSize: '16px' },
    },
  ],
};
