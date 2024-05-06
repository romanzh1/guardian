import { TimelineDotProps, TimelineDot as MTimelineDot } from '@mui/lab';
import { useTheme } from '@mui/material';
import { memo } from 'react';

export const TimelineDot = memo(({ ...props }: TimelineDotProps) => {
  const theme = useTheme();

  return (
    <MTimelineDot
      sx={{
        backgroundColor: theme.palette.primary.main,
        border: '2px solid white',
        borderRadius: `${theme.properties.borderRadius}px`,
        margin: 0,
        boxShadow: 'none',
      }}
    >
      {props.children}
    </MTimelineDot>
  );
});
