import { DialogActions as MuiDialogActions } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';
import styles from './index.module.scss';

export const DialogActions = memo(({ children }: PropsWithChildren<{}>) => {
  return (
    <MuiDialogActions sx={{ padding: '12px 16px 12px 16px' }}>
      <div className={styles.root}>{children}</div>
    </MuiDialogActions>
  );
});
