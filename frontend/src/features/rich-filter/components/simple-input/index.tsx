import { TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, memo, useCallback } from 'react';

type Props = {
  onChange: (value: string) => void;
  value: string;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const SimpleInput = memo(({ value, onChange, handleKeyDown }: Props) => {
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.currentTarget.value),
    [onChange],
  );

  return (
    <TextField
      autoComplete="off"
      autoFocus
      inputProps={{ onKeyDown: handleKeyDown }}
      onChange={onChangeHandler}
      value={value}
    />
  );
});
