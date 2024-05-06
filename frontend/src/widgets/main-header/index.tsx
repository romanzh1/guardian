import React, { memo } from 'react';
import { Box, useTheme } from '@mui/material';
import { useRoute } from 'react-router5';
import { RouterTypographyLink } from 'src/features/router5';
import styles from './index.module.scss';

export const MainHeader = memo(() => {
  const theme = useTheme();
  const linkColor = theme.palette.primary.main;
  const { route } = useRoute();
  return (
    <Box className={styles.root}>
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <div className={styles.logo}>
            <RouterTypographyLink
              path="root"
              routeParams={{}}
              sx={{ fontSize: '1.5rem', fontWeight: 900, textDecoration: 'none', color: linkColor }}
              variant="h2"
            >
              <strong>Guardian</strong>
            </RouterTypographyLink>
          </div>
        </div>
      </div>
    </Box>
  );
});
