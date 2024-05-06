import { RadioButtonCheckedTwoTone, RadioButtonUncheckedTwoTone } from '@mui/icons-material';
import { Radio as MuiRadio, CheckboxProps, Typography, FormHelperText } from '@mui/material';
import React, { memo } from 'react';
import { merge } from 'lodash';
import styles from './index.module.scss';

type Props = CheckboxProps & { label?: string; errorText?: string; helperText?: string };

export const Radio = memo(({ label, errorText, helperText, disabled, sx, ...restProps }: Props) => {
  const defaultSx: Props['sx'] = { '&.MuiRadio-root': { padding: '4px 4px' } };

  const newSx = merge(defaultSx, sx);

  return (
    <div className={styles.root}>
      <div className={styles.radio}>
        <MuiRadio
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restProps}
          checkedIcon={<RadioButtonCheckedTwoTone />}
          disabled={disabled}
          icon={<RadioButtonUncheckedTwoTone color="secondary" />}
          sx={newSx}
        />
        <Typography fontSize="0.8125rem">{label}</Typography>
      </div>
      {errorText && !disabled && (
        <FormHelperText error variant="outlined">
          {errorText}
        </FormHelperText>
      )}
      {helperText && <FormHelperText variant="outlined">{helperText}</FormHelperText>}
    </div>
  );
});
