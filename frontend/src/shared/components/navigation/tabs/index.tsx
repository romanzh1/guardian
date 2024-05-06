import React, { memo } from 'react';
import { Tabs as MuiTabs, TabsProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export const Tabs = memo(({ sx, ...restProps }: TabsProps) => {
  const theme = useTheme();

  const defaultSx: TabsProps['sx'] = {
    backgroundColor: theme.palette.tabs.background,
    borderRadius: `${theme.properties.borderRadius}px`,
    minHeight: '38px',
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: '32px',
      width: '100%',
      backgroundColor: theme.palette.tabs.indicator,
      borderRadius: '2px',
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <MuiTabs
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      sx={newSx}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />, ...restProps.TabIndicatorProps }}
    />
  );
});
