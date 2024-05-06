import { closeSnackbar, SnackbarKey } from 'notistack';
import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type Props = {
  snackbarKey: SnackbarKey;
};

export const CloseAction = ({ snackbarKey }: Props) => {
  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)} size="small">
      <CloseOutlined fontSize="tiny" sx={theme => ({ color: theme.palette.secondary.main })} />
    </IconButton>
  );
};
