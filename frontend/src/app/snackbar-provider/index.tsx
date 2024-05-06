/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, PropsWithChildren } from 'react';
import { SnackbarProvider as NotistackSnackbarProvider, SnackbarOrigin, SnackbarProviderProps } from 'notistack';
import { MAX_SNACK_COUNT } from './constants';
import { createSnackbar } from './components';

const anchorOrigin: SnackbarOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};

export const providerProps: SnackbarProviderProps = {
  anchorOrigin,
  maxSnack: MAX_SNACK_COUNT,
  Components: {
    success: createSnackbar('success'),
    error: createSnackbar('error'),
    info: createSnackbar('info'),
    warning: createSnackbar('warning'),
    default: createSnackbar('default'),
  },
};

export const SnackbarProvider = memo(({ children }: PropsWithChildren) => {
  return <NotistackSnackbarProvider {...providerProps}>{children}</NotistackSnackbarProvider>;
});
