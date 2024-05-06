import { IMaskMixin } from 'react-imask';
import { TextField } from '@mui/material';
import React from 'react';
import { AnyMaskedOptions } from 'imask';
import { ReactElementProps } from 'react-imask/dist/mixin';

type Props = ReactElementProps<HTMLTextAreaElement | HTMLInputElement> & {
  inputRef: any; // TODO
  // inputRef: React.RefCallback<HTMLTextAreaElement | HTMLInputElement>;
};

export const CodeMaskedInput = IMaskMixin<AnyMaskedOptions, false, string, HTMLTextAreaElement | HTMLInputElement>(
  ({ inputRef, onBlur, onChange, onFocus, value, selected }: Props) => (
    <TextField
      autoFocus
      error={selected}
      inputRef={inputRef}
      label="Код"
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder="______"
      size="small"
      value={value}
      variant="outlined"
    />
  ),
);
