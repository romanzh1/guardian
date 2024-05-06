import React, { forwardRef } from 'react';
import { Tab as MuiTab, TabProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const Tab = forwardRef(({ sx, ...restProps }: TabProps, ref: React.Ref<HTMLDivElement>) => {
  const theme = useTheme();

  const defaultSx: TabProps['sx'] = {
    textTransform: 'none',
    '& .MuiSvgIcon-root': {
      width: '16px',
      height: '16px',
      marginBottom: '0px',
      color: theme.palette.tab.icon,
    },
    minHeight: '38px',
    padding: '4px 16px',
    '&.Mui-selected': {
      '& .MuiSvgIcon-root': {
        color: theme.palette.tab.selectedIcon,
      },
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiTab
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
    />
  );
});
