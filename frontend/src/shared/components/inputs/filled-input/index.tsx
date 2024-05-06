import { TextField, FilledTextFieldProps, useTheme, OutlinedTextFieldProps } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { merge } from 'lodash';
import styles from './index.module.scss';
import { Tooltip } from '../../other';

export type FilledInputProps = Omit<FilledTextFieldProps, 'variant'> & {
  errorText?: string;
  hint?: string;
  autoComplete?: string;
};

type Props = Omit<OutlinedTextFieldProps, 'variant'> & { errorText?: string; hint?: string };

export const FilledInput = memo(({ errorText, helperText, hint, sx, ...props }: FilledInputProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState<boolean>(false);

  const onFocusHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      setFocused(true);
      if (props.onFocus) props.onFocus(event);
    },
    [props],
  );
  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      setFocused(false);
      if (props.onBlur) props.onBlur(event);
    },
    [props],
  );

  const { placeholder, background, hoverBg, focusedBg, disabled, text, main, error, active } =
    theme.palette.filledInput;
  const { borderRadius } = theme.properties;

  const borderColorMain = focused ? active : main;
  const borderColor = !errorText ? borderColorMain : error;
  const outlineColor = props.disabled ? disabled : borderColor;

  const defaultSx: Props['sx'] = {
    '& .MuiFilledInput-root': {
      borderRadius: `${borderRadius - 1}px`,
      background,
      border: `1px solid ${outlineColor}`,
      color: text,
      '&:hover': { background: hoverBg },
      '&.Mui-focused': { background: focusedBg },
      '&.Mui-disabled': {
        '&:hover': { background },
        background,
      },
    },
    '& .MuiFilledInput-input': {
      borderRadius: `${borderRadius - 1}px`,
      '&::placeholder': { color: placeholder },
    },
  };

  const newSx = merge(defaultSx, sx);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <TextField
          error={!!errorText}
          size="small"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          fullWidth
          helperText={errorText || helperText || ' '}
          InputProps={{
            ...props.InputProps,
            disableUnderline: true,
          }}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          sx={newSx}
          variant="filled"
        />
        {hint && <Tooltip color="secondary" fontSize="small" title={hint} />}
      </div>
    </div>
  );
});
