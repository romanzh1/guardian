import { CheckBox as CheckboxIcon, CheckBoxOutlineBlankTwoTone } from '@mui/icons-material';
import { Checkbox as MuiCheckbox, CheckboxProps, Typography, FormHelperText, useTheme } from '@mui/material';
import React, { memo, useRef } from 'react';
import { merge } from 'lodash';
import { nanoid } from 'nanoid';
import styles from './index.module.scss';

export type Props = CheckboxProps & { label?: string; errorText?: string; helperText?: string };

export const Checkbox = memo(({ label, errorText, helperText, disabled, sx, id, ...restProps }: Props) => {
  const theme = useTheme();
  const checkboxId = useRef(id || nanoid(6));
  const defaultSx: Props['sx'] = { '&.MuiCheckbox-root': { padding: 0 }, '&.Mui-disabled': { opacity: 0.3 } };

  const newSx = merge(defaultSx, sx);

  return (
    <div className={styles.root}>
      <div className={styles.checkbox}>
        <MuiCheckbox
          id={checkboxId.current}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restProps}
          checkedIcon={<CheckboxIcon />}
          disabled={disabled}
          icon={<CheckBoxOutlineBlankTwoTone color="secondary" />}
          sx={newSx}
        />
        {label && (
          <Typography
            color={disabled ? theme.palette.text.disabled : 'inherit'}
            component="label"
            htmlFor={checkboxId.current}
            variant="text"
          >
            {label}
          </Typography>
        )}
      </div>
      {errorText && !disabled && (
        <FormHelperText sx={{ color: theme.palette.input.error }} variant="outlined">
          {errorText}
        </FormHelperText>
      )}
      {helperText && <FormHelperText variant="outlined">{helperText}</FormHelperText>}
    </div>
  );
});
