import React, { ReactNode, useCallback } from 'react';
import { Dialog } from '@mui/material';
import { Button } from 'src/shared/components/inputs';
import { DialogActions, DialogTitleCloseable, DialogContent } from 'src/shared/components/feedback/dialog';
import { usePromise } from 'src/shared/hooks';

export * from './hooks';

type Props = {
  open: boolean;
  title: ReactNode;
  content?: ReactNode;
  onApply: () => void | Promise<any>;
  onCancel: () => void;
  applyLabel?: string;
  cancelLabel?: string;
};

export const ConfirmModal = ({
  open,
  onCancel,
  onApply,
  title,
  content,
  applyLabel = 'Да',
  cancelLabel = 'Отменить',
}: Props) => {
  const { isLoading, wrappedFn: wrappedOnApply } = usePromise(onApply);

  const handleApplyClick = useCallback(() => {
    wrappedOnApply();
  }, [wrappedOnApply]);

  const handleClose = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitleCloseable onClose={handleClose}>{title}</DialogTitleCloseable>
      {content && (
        <div>
          <DialogContent sx={{ width: '420px' }}>{content}</DialogContent>
        </div>
      )}

      <DialogActions>
        <Button fullWidth onClick={handleClose}>
          {cancelLabel}
        </Button>
        <Button fullWidth isLoading={isLoading} onClick={handleApplyClick} type="submit" variant="contained">
          {applyLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
