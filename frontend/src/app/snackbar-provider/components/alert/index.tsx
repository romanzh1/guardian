import { memo } from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, useTheme } from '@mui/material';
import { merge } from 'lodash';

export type AlertProps = Omit<MuiAlertProps, 'severity'> & {
  severity: MuiAlertProps['severity'] | 'default';
};

export const Alert = memo(({ sx, severity, ...restProps }: AlertProps) => {
  const theme = useTheme();

  const defaultSx: AlertProps['sx'] = {
    width: '100%',
    maxWidth: '500px',
    '&.MuiPaper-root': {
      borderRadius: `${theme.properties.borderRadius}px`,
    },
    '&.MuiAlert-standardSuccess': {
      background: theme.palette.alerts.success.background,
      color: theme.palette.alerts.success.text,
      '& .MuiAlert-icon': {
        color: theme.palette.alerts.success.icon,
      },
    },
    '&.MuiAlert-standardError': {
      background: theme.palette.alerts.error.background,
      color: theme.palette.alerts.error.text,
      '& .MuiAlert-icon': {
        color: theme.palette.alerts.error.icon,
      },
    },
    '&.MuiAlert-standardInfo': {
      background: theme.palette.alerts.info.background,
      color: theme.palette.alerts.info.text,
      '& .MuiAlert-icon': {
        color: theme.palette.alerts.info.icon,
      },
    },
    '&.MuiAlert-standardWarning': {
      background: theme.palette.alerts.warning.background,
      color: theme.palette.alerts.warning.text,
      '& .MuiAlert-icon': {
        color: theme.palette.alerts.warning.icon,
      },
    },
    fontSize: '13px',
  };

  let newSx: AlertProps['sx'] = {};

  newSx = merge(newSx, defaultSx);

  const defaultSeveritySx: AlertProps['sx'] = {
    '&.MuiAlert-root': {
      background: theme.palette.alerts.default.background,
      color: theme.palette.alerts.default.text,
      '& .MuiAlert-icon': {
        color: theme.palette.alerts.default.icon,
      },
    },
  };

  if (severity === 'default') {
    newSx = merge(newSx, defaultSeveritySx);

    return (
      <MuiAlert
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        sx={newSx}
      />
    );
  }

  return (
    <MuiAlert
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      severity={severity}
      sx={newSx}
    />
  );
});
