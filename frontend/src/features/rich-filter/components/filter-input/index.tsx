import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Input } from '../../../../shared/components';

type Props = {
  onChange: (value: string) => void;
  onBackspacePress: () => void;
  defaultValue?: string;
};
export const FilterInput = memo(({ onChange, onBackspacePress, defaultValue }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onChange(inputValue);
      }
      if (e.key === 'Backspace') {
        if (!inputValue) onBackspacePress();
      }
    },
    [onChange, inputValue, onBackspacePress],
  );

  useEffect(() => {
    if (defaultValue) setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.input}>
      <Input
        autoComplete="off"
        autoFocus
        inputProps={{ onKeyDown }}
        onChange={onInputChange}
        placeholder="Введите текст"
        value={inputValue}
      />
    </div>
  );
});
