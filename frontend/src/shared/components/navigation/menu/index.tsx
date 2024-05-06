import React, { memo } from 'react';
import { Menu as MuiMenu, MenuProps as MuiMenuProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export type MenuProps = MuiMenuProps;

export const Menu = memo(({ sx, ...restProps }: MenuProps) => {
  const theme = useTheme();

  const defaultSx: MenuProps['sx'] = {
    '& .MuiPaper-root': { borderRadius: `${theme.properties.borderRadius}px` },
    '& .MuiList-root': { padding: '8px' },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiMenu
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
