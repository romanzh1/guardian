import React, { ChangeEventHandler, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce, FilledInputProps, IconButton } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { Input, InputProps } from '../input';

export type SearchInputProps = InputProps & {
  onSearch?: (value: string) => void;
  initValue?: string;
};

export const SearchInput = memo(({ initValue = '', value, onSearch, onChange, ...restProps }: SearchInputProps) => {
  const [state, setState] = useState(initValue);

  useEffect(() => {
    setState(initValue);
  }, [initValue]);

  const handleDebouncedOnSubmit = useMemo(
    () =>
      debounce((v: string) => {
        if (onSearch) onSearch(v);
      }, 500),
    [onSearch],
  );

  const handleClearSearch = useCallback(() => {
    setState('');
    handleDebouncedOnSubmit('');
  }, [handleDebouncedOnSubmit]);

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
    e => {
      const searchValue = e.target.value;
      setState(searchValue);
      handleDebouncedOnSubmit(searchValue);
      if (onChange) onChange(e);
    },
    [handleDebouncedOnSubmit, onChange],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocusInput = useCallback(() => inputRef.current && inputRef.current.focus(), []);

  const searchIconProps = useMemo<Partial<FilledInputProps>>(
    () => ({
      endAdornment: (
        <IconButton edge="end" onClick={state ? handleClearSearch : handleFocusInput} size="small">
          {state ? <ClearIcon color="secondary" /> : <SearchRounded color="secondary" />}
        </IconButton>
      ),
    }),
    [handleClearSearch, state, handleFocusInput],
  );

  return (
    <Input
      placeholder="Поиск"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      InputProps={searchIconProps}
      inputRef={inputRef}
      onChange={handleSearch}
      value={value || state}
    />
  );
});
