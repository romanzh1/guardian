import React, { memo } from 'react';
import { Popover as MuiPopover, PopoverProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const Popover = memo(({ sx, ...restProps }: PopoverProps) => {
  const theme = useTheme();

  const defaultSx: PopoverProps['sx'] = {
    '& .MuiPaper-root': { borderRadius: `${theme.properties.borderRadius}px` },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiPopover
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
