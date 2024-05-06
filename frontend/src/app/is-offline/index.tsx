import React, { PropsWithChildren, memo, useEffect, useState, useCallback } from 'react';
import { Dialog, Typography } from '@mui/material';
import { Button, DialogActions, DialogContent, DialogTitleCloseable } from 'src/shared/components';

export const IsOffline = memo(({ children }: PropsWithChildren<{}>) => {
  const [offline, setOffline] = useState(!window.navigator.onLine);

  useEffect(() => {
    const disable = () => setOffline(false);
    const enable = () => setOffline(true);
    window.addEventListener('online', disable);
    window.addEventListener('offline', enable);
    return () => {
      window.removeEventListener('online', disable);
      window.removeEventListener('offline', enable);
    };
  }, []);

  const handlePageReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <>
      <Dialog onClose={() => {}} open={offline}>
        <DialogTitleCloseable>
          <Typography component="span" variant="h4">
            Упс...
          </Typography>
        </DialogTitleCloseable>
        <DialogContent sx={{ width: '420px' }}>
          <div style={{ padding: '20px 0' }}>
            <Typography variant="text">Похоже, что у вас пропало интернет соединение.</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePageReload}>Обновить</Button>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
});
