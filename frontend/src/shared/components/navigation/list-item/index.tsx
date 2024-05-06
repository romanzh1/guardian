import React, { memo } from 'react';
import { ListItemProps, ListItem as MuiListItem, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const ListItem = memo(({ sx, ...restProps }: ListItemProps) => {
  const theme = useTheme();

  const defaultSx: ListItemProps['sx'] = {
    padding: '0 8px',
    background: 'transparent',
    borderRadius: `${theme.properties.borderRadius}px`,
    '&:hover': {
      background: theme.palette.listItem.hoverBackground,
    },
    '& .MuiButtonBase-root.MuiListItemButton-root': {
      backgroundColor: 'transparent',
      borderBottom: `1px solid ${theme.palette.listItem.border}`,
    },
    '&:last-child .MuiButtonBase-root': {
      borderBottom: 'none',
    },
    '& .MuiTouchRipple-root': {
      left: '-8px',
      right: '-8px',
      borderRadius: `${theme.properties.borderRadius}px`,
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiListItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
