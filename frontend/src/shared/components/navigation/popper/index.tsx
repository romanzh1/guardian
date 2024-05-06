import { memo } from 'react';
import { Popper as MuiPopper, PopperProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const Popper = memo(({ sx, ...restProps }: PopperProps) => {
  const theme = useTheme();

  const defaultSx: PopperProps['sx'] = {
    '& .MuiPaper-root': { borderRadius: `${theme.properties.borderRadius}px` },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiPopper
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
