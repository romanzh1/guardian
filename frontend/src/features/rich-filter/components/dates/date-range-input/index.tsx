import { KeyboardEvent, Ref, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { isBefore } from 'date-fns';
import { IMaskMixin } from 'react-imask';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { maskOptions } from './mask-options';

type MaskedTextFieldProps = TextFieldProps & {
  inputRef: Ref<HTMLInputElement>;
  defaultValue: string;
};

const TF = ({ inputRef, defaultValue, ...otherProps }: MaskedTextFieldProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TextField autoFocus {...otherProps} inputRef={inputRef} value={defaultValue} />
);

// по типам можно прокинуть только обычные textarea и input, а по факту получается и TextField
const MaskedTextField = IMaskMixin(TF as any) as any;

type Props = {
  value: string;
  onChange: (value: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const DateRangeInput = memo(({ value, onChange, handleKeyDown }: Props) => {
  const inputProps = useMemo(
    () => ({
      onKeyDown: handleKeyDown,
    }),
    [handleKeyDown],
  );

  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleComplete = useCallback(
    (v: string) => {
      const [from, to] = maskOptions.parse(v);
      if (isBefore(from, to) && dayjs(from).isValid() && dayjs(to).isValid()) {
        onChange(`${dayjs(from).format('DD.MM.YYYY')} - ${dayjs(to).format('DD.MM.YYYY')}`);
      }
    },
    [onChange],
  );

  return (
    <MaskedTextField
      blocks={maskOptions.blocks}
      fullWidth
      inputProps={inputProps}
      lazy={maskOptions.lazy}
      mask={maskOptions.mask}
      onAccept={setLocalValue}
      onComplete={handleComplete}
      size="small"
      value={localValue}
    />
  );
});
