import React, { PropsWithChildren, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { useRouter } from 'react-router5';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AdminUserMenu } from 'src/widgets/admin-user-menu';
import { RouterTypographyLink } from 'src/features/router5';
import { Button } from 'src/shared/components';
import styles from './index.module.scss';

export const GuardianSidebarLayout = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const router = useRouter();
  const handleBackClick = useCallback(() => {
    router.navigateToDefault();
  }, [router]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <RouterTypographyLink
            path="root"
            routeParams={{}}
            sx={{
              fontSize: '1.5rem',
              fontWeight: 900,
              textDecoration: 'none',
              color: theme.palette.createIssueHeader.text,
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            Guardian
          </RouterTypographyLink>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
