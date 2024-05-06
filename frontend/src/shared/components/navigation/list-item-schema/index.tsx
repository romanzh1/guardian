import React, { memo } from 'react';
import { ListItemProps, ListItem as MuiListItem } from '@mui/material';
import { merge } from 'lodash';

export const ListItemSchema = memo(({ sx, ...restProps }: ListItemProps) => {
  const defaultSx: ListItemProps['sx'] = {
    background: 'transparent',
    border: `transparent`,
    justifyContent: 'space-between',
    '& .MuiListItemText-root': {
      margin: 0,
      flexBasis: 'fit-content',
      flexGrow: 0,
    },
    '& .MuiButtonBase-root.MuiListItemButton-root': {
      padding: 0,
      backgroundColor: 'transparent',
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
