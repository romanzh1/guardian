import { Typography, useTheme } from '@mui/material';
import React, { memo } from 'react';
import { useRoute } from 'react-router5';
import { mutations, queries } from 'src/api';
import { useNotifications } from 'src/libs';
import image from 'src/static/img/img-logo.png';
import { LoginForm } from './_components';
import styles from './index.module.scss';

export const LoginView = memo(() => {
  const { router, previousRoute } = useRoute();
  const theme = useTheme();
  const notify = useNotifications();

  const { refetch: getUserProfile } = queries.useGetProfile({ enabled: false });
  const { mutateAsync: sendCode } = mutations.usePostPassportLogin();
  const { data, mutateAsync: sendPhone } = mutations.usePostPassportLoginByPhone();

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.formWrap}>
          <div className={styles.logo}>
            <img alt="img" className={styles.img} src={image} />
            <Typography variant="h1">Guardian</Typography>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
});
