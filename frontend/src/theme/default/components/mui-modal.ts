import { Components } from '@mui/material/styles';
import { Theme as SystemTheme } from '@mui/system';

export const MuiModal: Components<SystemTheme>['MuiModal'] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
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
