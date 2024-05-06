import React, { memo } from 'react';
import { DialogContentProps, DialogContent as MuiDialogContent } from '@mui/material';
import { merge } from 'lodash';

type Props = DialogContentProps;

export const DialogContent = memo(({ sx, ...rest }: Props) => {
  const defaultSx: Props['sx'] = { display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 16px' };
  const newSx = merge(defaultSx, sx);

  return (
    <MuiDialogContent
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      sx={newSx}
    />
  );
});
