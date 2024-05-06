import React, { memo } from 'react';
import { ListItemIcon as MuiListItemIcon, ListItemIconProps } from '@mui/material';
import { merge } from 'lodash';

export const ListItemIcon = memo(({ sx, ...restProps }: ListItemIconProps) => {
  const defaultSx: ListItemIconProps['sx'] = {
    '&.MuiListItemIcon-root': {
      minWidth: 0,
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiListItemIcon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
