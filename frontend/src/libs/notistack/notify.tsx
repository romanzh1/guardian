import { enqueueSnackbar, OptionsObject, SnackbarMessage } from 'notistack';

export const notify = (message: SnackbarMessage, options?: OptionsObject) =>
  enqueueSnackbar(message, {
    preventDuplicate: true,
    ...options,
  });
