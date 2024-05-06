import { OutlinedTextFieldProps, useTheme, TextField, FormHelperText } from '@mui/material';
import React, { memo, useEffect } from 'react';
import { merge } from 'lodash';
import styles from './index.module.scss';
import { HelpTooltip } from '../../other';

export type InputProps = Omit<OutlinedTextFieldProps, 'variant' | 'select'> & {
  errorText?: string;
  hint?: string;
  onMount?: () => void;
};

export const Input = memo(({ errorText, hint, helperText, label, disabled, sx, onMount, ...restProps }: InputProps) => {
  useEffect(() => {
    if (onMount) onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();

  const { main, hover, active, error, label: labelColor, disabledText, disabledBg } = theme.palette.input;
  const { borderRadius } = theme.properties;

  const defaultSx: InputProps['sx'] = {
    minWidth: '100px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: main,
      borderRadius: `${borderRadius}px`,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: active,
      borderWidth: '1px',
    },
    '& .MuiOutlinedInput-root:not(.Mui-disabled)': {
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline ': {
          borderColor: hover,
        },
      },
    },
    '& .Mui-disabled': {
      backgroundColor: disabledBg,
      borderRadius: `${borderRadius}px`,
      WebkitTextFillColor: disabledText,
    },
    '& .MuiInputBase-root': {
      fontSize: '0.8125rem',
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <div className={styles.root}>
      {label && (
        <FormHelperText sx={{ color: disabled ? disabledText : labelColor }} variant="outlined">
          {label}
        </FormHelperText>
      )}
      <div className={styles.input}>
        <TextField
          disabled={disabled}
          error={Boolean(errorText)}
          fullWidth
          size="small"
          variant="outlined"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restProps}
          sx={newSx}
        />
        {hint && <HelpTooltip>{hint}</HelpTooltip>}
      </div>
      {errorText && !disabled && (
        <FormHelperText sx={{ color: error }} variant="outlined">
          {errorText}
        </FormHelperText>
      )}
      {helperText && (
        <FormHelperText sx={{ color: disabled ? disabledText : labelColor }} variant="outlined">
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
});
