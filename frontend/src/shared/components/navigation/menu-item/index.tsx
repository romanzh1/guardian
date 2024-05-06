import React, { memo } from 'react';
import { useTheme, MenuItem as MuiMenuItem, MenuItemProps } from '@mui/material';
import { merge } from 'lodash';

export const MenuItem = memo(({ sx, ...restProps }: MenuItemProps) => {
  const theme = useTheme();

  const defaultSx: MenuItemProps['sx'] = {
    ':hover': { backgroundColor: theme.palette.menuItem.hover },
    minHeight: '30px',
    fontSize: '0.8125rem',
    padding: '6px 8px',
    '& .MuiSvgIcon-root': {
      height: '20px',
      width: '20px',
      color: theme.palette.menuItem.icon,
    },
    columnGap: '8px',
    borderRadius: `${theme.properties.borderRadius}px`,
    margin: '1px',
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiMenuItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
