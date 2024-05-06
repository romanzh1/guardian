import { IconButtonProps as MuiIconButtonProps, IconButton as MuiIconButton, useTheme } from '@mui/material';
import React, { memo } from 'react';
import { merge } from 'lodash';

type Size = MuiIconButtonProps['size'] | 'tiny';

export type IconButtonProps = Omit<MuiIconButtonProps, 'size'> & {
  size?: Size;
  variant?: 'common' | 'contained';
};

export const IconButton = memo(({ size = 'medium', sx, variant = 'common', ...rest }: IconButtonProps) => {
  const theme = useTheme();

  const tinySx: IconButtonProps['sx'] = {
    height: '24px',
    width: '24px',
    '& .MuiSvgIcon-root': { height: '16px', width: '16px' },
  };

  const containedSx: IconButtonProps['sx'] = {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    ':hover': {
      background: theme.palette.primary.dark,
    },
  };

  let newSx: IconButtonProps['sx'] = {
    padding: '4px',
  };

  if (size === 'tiny') {
    newSx = merge(newSx, tinySx);
  }

  if (variant === 'contained') {
    newSx = merge(newSx, containedSx);
  }

  newSx = merge(newSx, sx);

  return (
    <MuiIconButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      sx={newSx}
    />
  );
});
