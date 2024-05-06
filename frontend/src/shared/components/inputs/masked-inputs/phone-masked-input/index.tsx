import React from 'react';
import { IMaskMixin } from 'react-imask';
import { InputAdornment, TextField } from '@mui/material';
import { AnyMaskedOptions } from 'imask';
import { ReactElementProps } from 'react-imask/dist/mixin';

const inputProps = {
  startAdornment: <InputAdornment position="start">+</InputAdornment>,
  // раскоментить как понадобится
  /* endAdornment: (
    <InputAdornment position="end">
      <Tooltip
        arrow
        placement="right"
        title={
          <>
            <Typography color="inherit" component="p" variant="body2">
              Для ввода РФ номеров необходимо ввести 11 цифр номера слитно, без пробелов, пример: 79990001122
            </Typography>
            <Typography color="inherit" component="p" variant="body2">
              Также есть возможность ввода телефонов других стран, например телефон Беларуси 12 цифр: 375220001122
            </Typography>
          </>
        }
      >
        <HelpOutline color="action" fontSize="small" />
      </Tooltip>
    </InputAdornment>
  ), */
};

type Props = ReactElementProps<HTMLTextAreaElement | HTMLInputElement> & {
  inputRef: any; // TODO
  // inputRef: React.RefCallback<HTMLTextAreaElement | HTMLInputElement>;
};

export const PhoneMaskedInput = IMaskMixin<AnyMaskedOptions, false, string, HTMLTextAreaElement | HTMLInputElement>(
  ({ inputRef, onBlur, onChange, onFocus, value, selected }: Props) => (
    <TextField
      autoFocus
      error={selected}
      InputProps={inputProps}
      inputRef={inputRef}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder="79990001122"
      size="small"
      value={value}
      variant="outlined"
    />
  ),
);
