import React, { memo } from 'react';
import { ListItemText as MuiListItemText, ListItemTextProps } from '@mui/material';
import { merge } from 'lodash';

export const ListItemText = memo(({ sx, ...restProps }: ListItemTextProps) => {
  const defaultSx: ListItemTextProps['sx'] = {
    '& .MuiTypography-root ': {
      fontSize: '13px',
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiListItemText
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
