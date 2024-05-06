import React, { memo, PropsWithChildren } from 'react';
import { Box, useTheme } from '@mui/material';
import { MainHeader } from 'src/widgets';
import styles from './index.module.scss';

type Props = {};

export const RootHeader = memo(({ children }: PropsWithChildren<Props>) => {
  const theme = useTheme();

  return (
    <Box className={styles.root} sx={{ backgroundColor: theme.palette.createIssueHeader.background }}>
      <MainHeader />
      <div className={styles.secondRow}>{children}</div>
    </Box>
  );
});
