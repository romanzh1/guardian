import { CustomContentProps, SnackbarContent } from 'notistack';
import React from 'react';
import { Alert, AlertProps } from '../alert';
import { CloseAction } from '../close-action';

export const createSnackbar = (severity: AlertProps['severity']) =>
  React.forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
    const { id, message } = props;

    return (
      <SnackbarContent ref={ref} role="alert">
        <Alert action={<CloseAction snackbarKey={id} />} severity={severity}>
          {message}
        </Alert>
      </SnackbarContent>
    );
  });
