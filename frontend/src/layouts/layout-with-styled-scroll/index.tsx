import { Box, useTheme } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';

export const LayoutWithStyledScroll = memo(({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const { track, thumb, corner } = theme.palette.scrollbar;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        '*::-webkit-scrollbar': { width: '6px', height: '6px' },
        '*::-webkit-scrollbar-track': {
          backgroundColor: track,
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          backgroundColor: thumb,
        },
        '*::-webkit-scrollbar-corner': {
          backgroundColor: corner,
        },
      }}
    >
      {children}
    </Box>
  );
});
