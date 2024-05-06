import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { ClickAwayListener, List, Paper } from '@mui/material';
import { RecordType } from 'src/shared/components/tables/table/types';
import { DEFAULT_KEYS } from 'src/constants';
import { Input, Popper } from 'src/shared/components';
import { Filter, KeysForOptions } from '../../types';
import styles from './index.module.scss';
import { ItemSelect } from './components';

const DEFAULT_ACTIVE: Filter[] = [];

type Props<T extends RecordType> = {
  options: T[];
  onBackspacePress: () => void;
  onChange: (filter: T) => void;
  onClickAway: (e: TouchEvent | MouseEvent) => void;
  async?: boolean;
  keys?: KeysForOptions;
  defaultValue?: string;
  activeFilters?: Filter[];
  onSearch?: (search: string) => void;
};

export const Select = <T extends RecordType>({
  options,
  activeFilters = DEFAULT_ACTIVE,
  onChange,
  onClickAway,
  onBackspacePress,
  onSearch,
  async,
  keys = DEFAULT_KEYS,
  defaultValue,
}: Props<T>) => {
  const [filteredKeys, setFilteredKeys] = useState<T[]>(options);
  const [inputValue, setInputValue] = useState('');
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
    setActiveIndex(null);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prevActiveIndex => {
          const newIndex = prevActiveIndex !== null ? prevActiveIndex + 1 : 0;
          return newIndex > filteredKeys.length - 1 ? 0 : newIndex;
        });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prevActiveIndex => {
          const newIndex = prevActiveIndex !== null ? prevActiveIndex - 1 : 0;
          return newIndex < 0 ? filteredKeys.length - 1 : newIndex;
        });
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex !== null) {
          onChange(filteredKeys[activeIndex]);
        }
      }
      if (e.key === 'Backspace' && inputValue.trim() === '') {
        e.preventDefault();
        onBackspacePress();
      }
    },
    [onChange, activeIndex, filteredKeys, onBackspacePress, inputValue],
  );

  useEffect(() => {
    if (async) {
      if (onSearch) {
        onSearch(inputValue);
      }
      setFilteredKeys(options);
    } else {
      const filtered = options.filter(
        item =>
          item?.[keys?.name]?.toLowerCase().includes(inputValue.toLowerCase()) &&
          !activeFilters?.some(filter => filter.id === item[keys?.id]),
      );
      setFilteredKeys(filtered);
    }
  }, [setFilteredKeys, inputValue, activeFilters, onSearch, options, keys, async]);

  useEffect(() => {
    if (defaultValue) setInputValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => setIsVisible(true), []);

  return (
    <div className={styles.root}>
      <div ref={anchorRef} className={styles.input}>
        <Input
          autoComplete="off"
          autoFocus
          inputProps={{ onKeyDown }}
          onChange={onInputChange}
          placeholder="Поиск и фильтр"
          value={inputValue}
        />
      </div>
      {filteredKeys.length > 0 && (
        <Popper
          anchorEl={anchorRef.current}
          className={styles.list}
          open={isVisible}
          placement="bottom-start"
          sx={{ borderRadius: '0px' }}
        >
          <ClickAwayListener onClickAway={onClickAway}>
            <Paper className={styles.listBlock} elevation={4}>
              <List className={styles.listBlockItems} sx={{ padding: 0 }}>
                {filteredKeys.map((item, index) => (
                  <ItemSelect
                    key={`${item?.[keys.id]}`}
                    activeIndex={activeIndex}
                    index={index}
                    item={item}
                    keys={keys}
                    onClick={onChange}
                  />
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </div>
  );
};

export const FilterSelect = memo(Select) as typeof Select;
