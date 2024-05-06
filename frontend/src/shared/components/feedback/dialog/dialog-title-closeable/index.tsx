import { DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import React, { PropsWithChildren, memo } from 'react';
import { Close } from '@mui/icons-material';
import styles from './index.module.scss';

type Props = {
  onClose?: () => void;
};

export const DialogTitleCloseable = memo(({ onClose, children }: PropsWithChildren<Props>) => {
  const theme = useTheme();
  const { titleBackground } = theme.palette.modal;

  return (
    <DialogTitle sx={{ background: titleBackground, padding: '8px 16px' }}>
      <Typography component="span" variant="h4">
        {children}
      </Typography>
      <div className={styles.closeButton}>
        <IconButton onClick={onClose}>
          <Close sx={{ width: '16px', height: '16px' }} />
        </IconButton>
      </div>
    </DialogTitle>
  );
});
