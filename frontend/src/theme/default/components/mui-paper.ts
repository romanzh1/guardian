import { Components } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  defaultProps: {
    elevation: 0,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      borderRadius: '16px',
      '*::-webkit-scrollbar': { width: '6px', height: '6px' },
      '*::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.scrollbar.track,
      },
      '*::-webkit-scrollbar-thumb': {
        borderRadius: '5px',
        backgroundColor: theme.palette.scrollbar.thumb,
      },
      '*::-webkit-scrollbar-corner': {
        backgroundColor: theme.palette.scrollbar.corner,
      },
    }),
  },
};
