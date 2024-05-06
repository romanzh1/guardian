import React, { ChangeEventHandler, KeyboardEventHandler, memo, useCallback, useMemo, useRef, useState } from 'react';
import { CircularProgress, debounce } from '@mui/material';
import { Close, SearchRounded } from '@mui/icons-material';
import styles from './index.module.scss';
import { MenuItem } from '../../navigation';
import { Select, SelectProps as SelectProperties } from '../select';
import { Input } from '../input';
import { IconButton } from '../icon-button';

export type SelectWithSearchProps = SelectProperties & {
  onSearch?: (value: string) => void;
  debouncedOnSearch?: (value: string) => void;
  isLoadingMenu?: boolean;
  onReset?: () => void;
  isLoadingNextPage?: boolean;
};

export const SelectWithSearch = memo(
  ({
    children,
    SelectProps,
    isLoading,
    onSearch,
    debouncedOnSearch,
    isLoadingMenu,
    onReset,
    isLoadingNextPage,
    ...rest
  }: SelectWithSearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const focus = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(e => {
      // Prevent MUI-Autoselect while typing
      e.stopPropagation();
    }, []);

    const [search, setSearch] = useState<string>('');

    const handleDebouncedOnSearch = useMemo(
      () =>
        debounce((value: string) => {
          if (debouncedOnSearch) debouncedOnSearch(value);
        }, 500),
      [debouncedOnSearch],
    );

    const handleSearch = useCallback(
      (value: string) => {
        setSearch(value);
        handleDebouncedOnSearch(value);
        if (onSearch) onSearch(value);
      },
      [handleDebouncedOnSearch, onSearch],
    );

    const clearSearch = useCallback(() => {
      handleSearch('');
      focus();
    }, [focus, handleSearch]);

    const handleOnChangeSearchInput = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
      e => {
        handleSearch(e.target.value);
      },
      [handleSearch],
    );

    const isEmptyList = (Array.isArray(children) && !children.length) || !children;

    const emptyContent = <MenuItem>Ничего не найдено</MenuItem>;

    const loadingContent = (
      <MenuItem>
        <div className={styles.root}>
          <CircularProgress className={styles.preloader} size={24} />
        </div>
      </MenuItem>
    );

    let content = children;

    if (isLoadingMenu) {
      content = loadingContent;
    } else if (isEmptyList) {
      content = emptyContent;
    }

    const icon = useMemo(() => {
      if (search)
        return (
          <IconButton color="secondary" onClick={clearSearch} size="tiny">
            <Close />
          </IconButton>
        );
      return (
        <IconButton color="secondary" onClick={focus} size="tiny">
          <SearchRounded />
        </IconButton>
      );
    }, [clearSearch, focus, search]);

    return (
      <Select
        isLoading={isLoading}
        onReset={onReset}
        SelectProps={{
          ...SelectProps,
          MenuProps: {
            disableAutoFocusItem: true,
            MenuListProps: {
              subheader: (
                <Input
                  InputProps={{ endAdornment: icon }}
                  inputRef={inputRef}
                  onChange={handleOnChangeSearchInput}
                  onKeyDown={handleKeyDown}
                  onMount={focus}
                  placeholder="Поиск"
                  value={search}
                />
              ),
            },
          },
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {content}
        {isLoadingNextPage && loadingContent}
      </Select>
    );
  },
);
