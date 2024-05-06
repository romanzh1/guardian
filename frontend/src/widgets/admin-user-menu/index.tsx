import React, { memo, useCallback } from 'react';
import { CircularProgress, IconButton, ListItemIcon, ListItemText, PopoverOrigin, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useRouter } from 'react-router5';
import { Userpic, Menu, MenuItem } from 'src/shared/components';
import { usePopoverProps } from 'src/shared/hooks';
import { mutations, queries } from 'src/api';
import styles from './index.module.scss';

const anchorOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

export const AdminUserMenu = memo(() => {
  const { anchorElement, handleOpen, handleClose, isOpen } = usePopoverProps();
  const { mutateAsync: logout, isLoading } = mutations.usePostPassportLogout();
  const { data, isFetching } = queries.useGetProfile({ enabled: false });

  const router = useRouter();

  const handleLogout = useCallback(async () => {
    handleClose();
    const onSuccess = () => {
      router.validNavigate('login');
    };
    await logout(undefined, { onSuccess });
  }, [handleClose, logout, router]);

  return (
    <div className={styles.root}>
      <div className={styles.userIcon}>
        <div className={styles.icon}>
          <IconButton onClick={handleOpen}>
            <Userpic firstName={data.user.first_name} lastName={data.user.last_name} size="medium" />
          </IconButton>
          {(isLoading || isFetching) && <CircularProgress className={styles.preloader} size={24} />}
        </div>
        <div className={styles.userInfo}>
          <Typography variant="text">{data.user.last_name}</Typography>
          <Typography variant="text">{`${data.user.first_name} ${data.user.middle_name}`}</Typography>
        </div>
      </div>
      <Menu anchorEl={anchorElement} anchorOrigin={anchorOrigin} keepMounted onClose={handleClose} open={isOpen}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </MenuItem>
      </Menu>
    </div>
  );
});
